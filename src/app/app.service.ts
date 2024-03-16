import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Badge, Introduction, IntroductionResponse, Project, ProjectResponse } from './app.types';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    introduction: Signal<Introduction | undefined>;
    webProjects: Signal<Project[] | undefined>;
    otherProjects: Signal<Project[] | undefined>;

    #http = inject(HttpClient);
    readonly #introductionFields: string[] = ['description', 'links.*'];
    readonly #projectFields: string[] = [
        'name',
        'summary',
        'card_image_src',
        'year',
        'descriptions.text',
        'badges.badge_id.key',
        'links.*',
    ];

    constructor() {
        this.introduction = toSignal(this.#getIntroduction$());
        this.webProjects = toSignal(this.#getProjects$('web'));
        this.otherProjects = toSignal(this.#getProjects$('other'));
    }

    #getIntroduction$(): Observable<Introduction> {
        const url: string = `${environment.cmsUrl}/items/introduction`;
        return this.#http
            .get<{ data: IntroductionResponse }>(url, {
                params: {
                    fields: this.#introductionFields.join(','),
                },
            })
            .pipe(map(({ data }) => this.#mapIntroduction(data)));
    }

    #getProjects$(type: 'web' | 'other'): Observable<Project[]> {
        const url: string = `${environment.cmsUrl}/items/project`;
        return this.#http
            .get<{ data: ProjectResponse[] }>(url, {
                params: {
                    fields: this.#projectFields.join(','),
                    'filter[project_type][type][_eq]': type,
                },
            })
            .pipe(map(({ data }) => data.map(this.#mapProject)));
    }

    #mapIntroduction = (res: IntroductionResponse): Introduction => ({
        description: res.description,
        links: res.links,
    });

    #mapProject = (res: ProjectResponse): Project => ({
        name: res.name,
        summary: res.summary,
        shortDescriptions: res.descriptions.map(desc => desc.text),
        cardImageSrc: res.card_image_src,
        badges: res.badges.map(badge => badge.badge_id.key as Badge),
        year: res.year,
        links: res.links,
    });
}
