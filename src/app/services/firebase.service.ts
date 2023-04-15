import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { RemoteConfig, Value, fetchAndActivate, getAll, getRemoteConfig } from 'firebase/remote-config';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { Observable, ReplaySubject, from, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import defaultConfig from '../../assets/default-config.json';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    public config$: Observable<Record<string, string>>;

    private _config$: ReplaySubject<Record<string, string>> = new ReplaySubject();

    constructor() {
        this.config$ = this._config$.asObservable();

        const app: FirebaseApp = initializeApp(environment.firebase);

        const remoteConfig: RemoteConfig = getRemoteConfig(app);
        remoteConfig.defaultConfig = defaultConfig;
        remoteConfig.settings.fetchTimeoutMillis = 2000;
        from(fetchAndActivate(remoteConfig))
            .pipe(
                take(1),
                map(() =>
                    Object.entries(getAll(remoteConfig)).reduce(
                        (a, [k, v]: [string, Value]) => ({ ...a, [k]: v.asString() }),
                        {}
                    )
                ),
                catchError(() => of(defaultConfig))
            )
            .subscribe(this._config$);

        const analytics: Analytics = getAnalytics(app);
    }
}
