import { Injectable } from '@angular/core';
import { Badge, Project } from './project.service.types';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    mainProjects: Project[] = [
        {
            name: 'Formly Editor',
            summary: 'An Editor for creating JSON based ngx-formly forms',
            shortDescriptions: [
                'Import, export or create new JSON based forms and models',
                'Style components using grid and flex options. Also supports custom classes',
                'Supports component drag and drop',
                'Configure the editor app to support custom ngx-formly components',
            ],
            cardImageSrc: 'portfolio/formly-editor',
            badges: [
                Badge.ANGULAR,
                Badge.NGX_FORMLY,
            ],
            openLink: 'https://formly-editor.web.app',
            year: 2022
        },
        {
            name: 'Vizman',
            summary: 'A website that allows the user to combine multiple 2D visualizers, static images and gifs to create... chaotic art',
            shortDescriptions: [
                'Provides lots of control sliders and toggles for customization',
                '\'Entities\' are drawn on canvases and can be moved and scaled with touch/mouse',
                'Multiple \'Emitters\' can be used spawn multiple \'Entities\' at set intervals',
                'Allows the user to control the speed of gifs',
            ],
            cardImageSrc: 'portfolio/vizman',
            badges: [
                Badge.ANGULAR,
                Badge.NG_ZORRO,
            ],
            githubLink: 'https://github.com/sesan07/vizman',
            openLink: 'https://viz-man.web.app/',
            year: 2021
        },
        {
            name: 'Footychan!',
            summary: 'A website that shows detailed information about football fixtures, teams, leagues and players',
            shortDescriptions: [
                'Designed to support multiple device sizes',
                'Data is fetched using the API-Football REST API',
                'Uses a favorites system and localstorage to display preferred items above others',
                'Uses Tailwind CSS for styling',
            ],
            cardImageSrc: 'portfolio/footy-chan',
            badges: [
                Badge.ANGULAR,
                Badge.TAILWIND
            ],
            githubLink: 'https://github.com/sesan07/football-site',
            openLink: 'https://footy-chan.web.app/',
            year: 2020
        },
    ]
    otherProjects: Project[] = [
        {
            name: 'UPEI Panthers (Unofficial)',
            summary: 'An app that provides a native android experience for viewing fixtures and news from the UPEI Panthers website',
            cardImageSrc: 'portfolio/upei-panthers',
            badges: [
                Badge.ANDROID,
                Badge.KOTLIN
            ],
            githubLink: 'https://github.com/sesan07/UPEIPanthers',
            openLink: 'https://play.google.com/store/apps/details?id=com.drey.upeipanthers',
            year: 2020
        },
        {
            name: 'COUNTER 5 Report Tool',
            summary: 'A tool for libraries to harvest and manage their COUNTER-compliant usage reports',
            cardImageSrc: 'portfolio/counter-5',
            badges: [
                Badge.DESKTOP,
                Badge.PYTHON
            ],
            githubLink: 'https://github.com/CS-4820-Library-Project/COUNTER-5-Report-Tool',
            year: 2020
        },
        {
            name: 'Craball',
            summary: 'A mobile game where you play as a quadrupedal mech, tasked with destroying the zombified humanoid robots that have invaded earth',
            cardImageSrc: 'portfolio/craball',
            badges: [
                Badge.ANDROID,
                Badge.UNITY,
                Badge.C_SHARP
            ],
            openLink: 'https://play.google.com/store/apps/details?id=com.Khan0nGames.Craball',
            year: 2019
        },
        {
            name: 'Tube Ride',
            summary: 'My take on the endless-runner genre of mobiles game that involves avoiding obstacles in an endless curving tube',
            cardImageSrc: 'portfolio/tube-ride',
            badges: [
                Badge.ANDROID,
                Badge.UNITY,
                Badge.C_SHARP
            ],
            openLink: 'https://play.google.com/store/apps/details?id=com.khan0ngames.tuberide',
            year: 2018
        }
    ]
}
