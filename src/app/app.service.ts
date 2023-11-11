import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Badge, Project, ProjectResponse } from './app.types';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    webProjects = signal<Project[]>([]);
    otherProjects = signal<Project[]>([]);

    private _http = inject(HttpClient);
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

    constructor() {
        this.getProjects$('web').subscribe(p => this.webProjects.set(p));
        this.getProjects$('other').subscribe(p => this.otherProjects.set(p));
    }

    getProjects$(type: 'web' | 'other'): Observable<Project[]> {
        const url: string = `${environment.cmsUrl}/items/project`;
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
