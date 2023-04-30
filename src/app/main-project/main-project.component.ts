import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';

import { Project } from '../app.types';

@Component({
    selector: 'app-main-project',
    templateUrl: './main-project.component.html',
    styleUrls: ['./main-project.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectComponent {
    @Input() project!: Project;
    @Input() isInverted?: boolean;

    readonly defaultImgWidth: number = 1248;
    readonly imgWidthPairs: [number, number][] = [
        [600, 700],
        [992, 1000],
    ]; // [media query max-width, img width]
    public readonly descriptionAnimationDelay: number = 150;

    constructor(public elementRef: ElementRef<HTMLElement>) {}
}
