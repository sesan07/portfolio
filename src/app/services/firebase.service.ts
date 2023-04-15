import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { RemoteConfig, Value, fetchAndActivate, getAll, getRemoteConfig } from 'firebase/remote-config';
import { Observable, ReplaySubject, from, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import defaultConfig from '../../assets/default-config.json';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    public config$: Observable<Record<string, string>>;

    private _app: FirebaseApp;
    private _remoteConfig: RemoteConfig;
    private _config$: ReplaySubject<Record<string, string>> = new ReplaySubject();

    constructor() {
        this.config$ = this._config$.asObservable();

        this._app = initializeApp(environment.firebase);
        this._remoteConfig = getRemoteConfig(this._app);
        this._remoteConfig.defaultConfig = defaultConfig;
        this._remoteConfig.settings.fetchTimeoutMillis = 2000;
        this._remoteConfig.settings.minimumFetchIntervalMillis = 5000;

        from(fetchAndActivate(this._remoteConfig))
            .pipe(
                take(1),
                map(() =>
                    Object.entries(getAll(this._remoteConfig)).reduce(
                        (a, [k, v]: [string, Value]) => ({ ...a, [k]: v.asString() }),
                        {}
                    )
                ),
                catchError(() => of(defaultConfig))
            )
            .subscribe(this._config$);
    }
}
