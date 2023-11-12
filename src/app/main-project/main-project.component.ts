import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';

import { Project } from '../app.types';
import { ProjectImageDirective } from '../project-image/project-image.directive';
import { AnimateEntryDirective } from '../animate-entry/animate-entry.directive';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-main-project',
    templateUrl: './main-project.component.html',
    styleUrl: './main-project.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CardComponent, AnimateEntryDirective, ProjectImageDirective],
})
export class MainProjectComponent {
    @Input({ required: true }) project!: Project;
    @Input() isInverted?: boolean;
    @Input() lazyLoadImage?: boolean;

    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    readonly defaultImgWidth: number = 1248;
    readonly imgWidthPairs: [number, number][] = [
        [600, 700],
        [992, 1000],
    ]; // [media query max-width, img width]
    readonly descriptionAnimationDelay: number = 150;
}
