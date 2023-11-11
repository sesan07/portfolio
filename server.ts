import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Express } from 'express';
import morgan from 'morgan';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

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
                providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
            })
            .then(html => res.send(html))
            .catch(err => next(err));
    });

    return server;
}

function run(): void {
    const port: number = process.env['PORT'] ? +process.env['PORT'] : 4200;
    // Start up the Node server
    const server: Express = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

run();
