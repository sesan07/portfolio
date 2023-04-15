import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { FirebaseService } from '../services/firebase.service';
import { Project } from '../app.types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild('about') aboutElementRef!: ElementRef<HTMLElement>;
    @ViewChild('webProjects') webProjectsElementRef!: ElementRef<HTMLElement>;
    @ViewChild('otherProjects') otherProjectsElementRef!: ElementRef<HTMLElement>;

    headerHeight: number = 100;
    githubLink: string = 'https://github.com/sesan07';
    resumeLink: string = 'https://drive.google.com/file/d/1stGmZ8Y4VM-zbg-MFIGm2MrDHn6oLO7_/view?usp=sharing';
    description: string = `
        Hi. I'm Sam. I write code.

        I work in web development of Angular 2 based apps.
        I work with technologies like NodeJS, Docker, Hapi, RAML, Molecular, Oracle and the ELK stack.
        My job involves building dockerized micro-services, APIs and apps using Docker Compose.

        I enjoy learning new things by working on personal projects whenever I get the chance!
    `;
    mainProjects$: Observable<Project[]>;
    otherProjects$: Observable<Project[]>;

    private _destroy: Subject<void> = new Subject();

    constructor(private _route: ActivatedRoute, private _firebaseService: FirebaseService) {
        this.mainProjects$ = this._firebaseService.config$.pipe(
            map(v => JSON.parse(v.webProjects ?? '[]'), takeUntil(this._destroy))
        );
        this.otherProjects$ = this._firebaseService.config$.pipe(
            map(v => JSON.parse(v.otherProjects ?? '[]'), takeUntil(this._destroy))
        );
    }

    ngOnInit(): void {
        this._route.fragment.subscribe(fragment => {
            switch (fragment) {
                case 'about':
                    this._smoothScrollTo(this.aboutElementRef);
                    break;
                case 'web-projects':
                    this._smoothScrollTo(this.webProjectsElementRef);
                    break;
                case 'other-projects':
                    this._smoothScrollTo(this.otherProjectsElementRef);
                    break;
            }
        });
    }

    ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

    private _smoothScrollTo(elementRef: ElementRef): void {
        if (!elementRef) {
            return;
        }

        const elementOffsetTop: number = elementRef.nativeElement.offsetTop;
        window.scrollTo({
            top: elementOffsetTop - this.headerHeight,
            behavior: 'smooth',
        });
    }
}
