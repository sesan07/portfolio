import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import axios from 'axios';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './src/main.server';

export interface ProjectResponse {
    name: string;
    summary: string;
    card_image_src: string;
    github_link: string;
    open_link: string;
    year: number;
    descriptions: {
        text: string;
    }[];
    badges: {
        badge_id: {
            key: string;
        };
    }[];
}

export interface Project {
    name: string;
    summary: string;
    shortDescriptions?: string[];
    cardImageSrc: string;
    badges: Badge[];
    githubLink?: string;
    openLink?: string;
    year: number;
}

export enum Badge {
    ANDROID = 'Android',
    ANGULAR = 'Angular',
    C_SHARP = 'C-Sharp',
    DESKTOP = 'Desktop',
    KOTLIN = 'Kotlin',
    NG_ZORRO = 'NG-Zorro',
    NGX_FORMLY = 'NGX-Formly',
    PYTHON = 'Python',
    TAILWIND = 'Tailwind-CSS',
    UNITY = 'Unity',
}

interface AppState {
    projects: {
        web: Project[];
        other: Project[];
    };
}

const projectFields: string[] = [
    'name',
    'summary',
    'card_image_src',
    'github_link',
    'open_link',
    'year',
    'descriptions.text',
    'badges.badge_id.key',
];

const appState: AppState = {
    projects: {
        web: [],
        other: [],
    },
};

const mapProject = (res: ProjectResponse): Project => ({
    name: res.name,
    summary: res.summary,
    shortDescriptions: res.descriptions.map(desc => desc.text),
    cardImageSrc: res.card_image_src,
    badges: res.badges.map(badge => badge.badge_id.key as Badge),
    githubLink: res.github_link,
    openLink: res.open_link,
    year: res.year,
});

const getProjects = async (type: string) => {
    const directusUrl: string = process.env['DIRECTUS_URL'] || 'http://directus:8055';
    return (
        await axios.get<{ data: ProjectResponse[] }>(`${directusUrl}/items/project`, {
            params: {
                fields: projectFields.join(','),
                'filter[project_type][type][_eq]': type,
            },
        })
    ).data.data.map(mapProject);
};

const updateProjects = async () => {
    appState.projects.web = await getProjects('web');
    appState.projects.other = await getProjects('other');
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();
    const distFolder = join(process.cwd(), 'dist/portfolio/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap,
        })
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
            maxAge: '1y',
        })
    );

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        res.render(indexHtml, {
            req,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },
                { provide: 'APP_STATE', useValue: appState },
            ],
        });
    });

    return server;
}

function run(): void {
    const port = process.env['PORT'] || 4000;

    updateProjects();
    const interval = process.env['UPDATE_INTERVAL'] ? +process.env['UPDATE_INTERVAL'] : 3600000;
    setInterval(updateProjects, interval);

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export default bootstrap;
