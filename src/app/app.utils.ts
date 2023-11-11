import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { PLATFORM_ID, StateKey, TransferState, inject, makeStateKey } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const STATE_KEY_PREFIX: string = 'http_request:';

export const transferHttpResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const platformId: object = inject(PLATFORM_ID);
    const transferState: TransferState = inject(TransferState);

    const key: StateKey<unknown> = makeStateKey(STATE_KEY_PREFIX + req.urlWithParams);

    if (isPlatformBrowser(platformId)) {
        // Try reusing transferred response from server
        const cachedResponse: unknown = transferState.get(key, null);
        if (cachedResponse) {
            transferState.remove(key);
            return of(
                new HttpResponse({
                    body: cachedResponse,
                    status: 200,
                    statusText: 'OK (from server)',
                })
            );
        }
        return next(req);
    }

    if (isPlatformServer(platformId)) {
        // Query CMS in directly instead of going through DNS
        if (req.url.startsWith(environment.cmsUrl)) {
            const newUrl: string = req.url.replace(environment.cmsUrl, environment.serverCMSUrl);
            return next(req.clone({ url: newUrl })).pipe(
                tap(event => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        transferState.set(key, event.body);
                    }
                })
            );
        } else {
            return next(req);
        }
    }

    return next(req);
};
