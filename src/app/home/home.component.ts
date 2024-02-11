import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnimateEntryDirective } from '../animate-entry/animate-entry.directive';
import { AppService } from '../app.service';
import { CardComponent } from '../card/card.component';
import { MainProjectComponent } from '../main-project/main-project.component';
import { TitleComponent } from '../title/title.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TitleComponent, CardComponent, MainProjectComponent, AnimateEntryDirective, AsyncPipe, NgIf],
})
export class HomeComponent implements OnInit {
    @ViewChild('about') aboutElementRef!: ElementRef<HTMLElement>;
    @ViewChild('webProjects') webProjectsElementRef!: ElementRef<HTMLElement>;
    @ViewChild('otherProjects') otherProjectsElementRef!: ElementRef<HTMLElement>;

    appService = inject(AppService);
    headerHeight: number = 100;

    #route = inject(ActivatedRoute);

    ngOnInit(): void {
        this.#route.fragment.subscribe(fragment => {
            switch (fragment) {
                case '':
                case 'about':
                    this.#smoothScrollTo(this.aboutElementRef);
                    break;
                case 'web-projects':
                    this.#smoothScrollTo(this.webProjectsElementRef);
                    break;
                case 'other-projects':
                    this.#smoothScrollTo(this.otherProjectsElementRef);
                    break;
            }
        });
    }

    #smoothScrollTo(elementRef: ElementRef): void {
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
