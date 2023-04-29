import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Project } from '../app.types';
import { AppService } from '../app.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
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

    constructor(appService: AppService, private _route: ActivatedRoute) {
        this.mainProjects$ = appService.getProjects$('web');
        this.otherProjects$ = appService.getProjects$('other');
    }

    ngOnInit(): void {
        this._route.fragment.subscribe(fragment => {
            switch (fragment) {
                case '':
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
