import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppState, Badge, Project, ProjectResponse } from './app.types';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

const APP_STATE_KEY = makeStateKey<AppState>('APP_STATE');

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private _isBrowser: boolean;
    private readonly _projectFields: string[] = [
        'name',
        'summary',
        'card_image_src',
        'github_link',
        'open_link',
        'year',
        'descriptions.text',
        'badges.badge_id.key',
    ];

    constructor(
        @Inject(PLATFORM_ID) platformId: Object,
        @Optional() @Inject('APP_STATE') private _appState: AppState,
        private _state: TransferState,
        private _http: HttpClient
    ) {
        this._isBrowser = isPlatformBrowser(platformId);
        if (!this._isBrowser) {
            this._state.set(APP_STATE_KEY, this._appState);
        }
    }

    getProjects$(type: 'web' | 'other'): Observable<Project[]> {
        if (this._isBrowser) {
            this._appState = this._state.get(APP_STATE_KEY, {
                projects: {
                    web: [],
                    other: [],
                },
            });

            return this._appState?.projects[type].length
                ? of(this._appState.projects[type])
                : this._fetchProjects(type);
        } else {
            return of(this._appState?.projects[type] ?? []);
        }
    }

    private _fetchProjects(type: string): Observable<Project[]> {
        const url: string = `${environment.directusUrl}/items/project`;
        return this._http
            .get<{ data: ProjectResponse[] }>(url, {
                params: {
                    fields: this._projectFields.join(','),
                    'filter[project_type][type][_eq]': type,
                },
            })
            .pipe(map(({ data }) => data.map(this._mapProject)));
    }

    private _mapProject = (res: ProjectResponse): Project => ({
        name: res.name,
        summary: res.summary,
        shortDescriptions: res.descriptions.map(desc => desc.text),
        cardImageSrc: res.card_image_src,
        badges: res.badges.map(badge => badge.badge_id.key as Badge),
        githubLink: res.github_link,
        openLink: res.open_link,
        year: res.year,
    });
}
