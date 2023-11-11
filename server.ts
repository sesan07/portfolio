import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import axios from 'axios';
import express, { Express } from 'express';
import morgan from 'morgan';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
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

const getProjects = async (type: string): Promise<Project[]> => {
    const directusUrl: string = process.env['DIRECTUS_URL'] || 'https://portfolio.sesan.dev/cms';
    return (
        await axios.get<{ data: ProjectResponse[] }>(`${directusUrl}/items/project`, {
            params: {
                fields: projectFields.join(','),
                'filter[project_type][type][_eq]': type,
            },
        })
    ).data.data.map(mapProject);
};

const updateProjects = async (): Promise<void> => {
    appState.projects.web = await getProjects('web');
    appState.projects.other = await getProjects('other');
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(): Express {
    const server: Express = express();
    const serverDistFolder: string = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder: string = resolve(serverDistFolder, '../browser');
    const indexHtml: string = join(serverDistFolder, 'index.server.html');

    // Log requests
    server.use(morgan('common'));

    const commonEngine: CommonEngine = new CommonEngine({
        enablePerformanceProfiler: true,
    });

    server.set('view engine', 'html');
    server.set('views', browserDistFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(browserDistFolder, {
            maxAge: '1y',
        })
    );

    // All regular routes use the Angular engine
    server.get('*', (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;

        commonEngine
            .render({
                bootstrap,
                documentFilePath: indexHtml,
                url: `${protocol}://${headers.host}${originalUrl}`,
                publicPath: browserDistFolder,
                providers: [
                    { provide: APP_BASE_HREF, useValue: baseUrl },
                    { provide: 'APP_STATE', useValue: appState },
                ],
            })
            .then(html => res.send(html))
            .catch(err => next(err));
    });

    return server;
}

async function run(): Promise<void> {
    const port: number = process.env['PORT'] ? +process.env['PORT'] : 4000;

    await updateProjects();
    const interval: number = process.env['UPDATE_INTERVAL'] ? +process.env['UPDATE_INTERVAL'] : 3600000;
    setInterval(updateProjects, interval);

    // Start up the Node server
    const server: Express = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();
