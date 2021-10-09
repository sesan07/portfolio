import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('about') aboutElementRef!: ElementRef<HTMLElement>;
    @ViewChild('webProjects') webProjectsElementRef!: ElementRef<HTMLElement>;
    @ViewChild('otherProjects') otherProjectsElementRef!: ElementRef<HTMLElement>;

    headerHeight: number = 100;
    githubLink: string = 'https://github.com/sesan07';
    resumeLink: string = 'https://drive.google.com/file/d/1stGmZ8Y4VM-zbg-MFIGm2MrDHn6oLO7_/view?usp=sharing'
    description: string = `Hello! I graduated from the University of Prince Edward Island with a bachelor’s degree in computer science. 
    While in school, I spent too much of my free time developing and 'deploying' personal projects. 
    I started out by using Unity 3D to make mobile games for Android. 
    I then moved on to making native Android apps to give myself a new challenge. 
    When Covid hit, I had too much free time and decided to look into web development with Angular. 
    I made my first portfolio website and then created a football website which got me my first job! 
    Looking to learn more while working, I created an audio visualizer app as a side project on weekends, learned a lot of new things. 
    I am always looking for new challenges and love learning new technologies!`

    constructor(private _route: ActivatedRoute, public projectService: ProjectService) {
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

    private _smoothScrollTo(elementRef: ElementRef): void {
        if (!elementRef) {
            return;
        }

        const elementOffsetTop: number = elementRef.nativeElement.offsetTop;
        window.scrollTo({
            top: elementOffsetTop - this.headerHeight,
            behavior: 'smooth'
        });
    }

}
