import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Badge } from '../app.types';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input() cardTitle: string = '';
    @Input() description: string = '';
    @Input() githubLink?: string;
    @Input() openLink?: string;
    @Input() resumeLink?: string;
    @Input() imageSrc?: string;
    @Input() badges: Badge[] = [];
    @Input() year?: number;

    readonly defaultImgWidth: number = 1080;
    readonly imgWidthPairs: [number, number][] = [[600, 700]]; // [media query max-width, img width]

    getIcon = (iconKey: string): string => `assets/image/${iconKey}.png`;
    getIconName = (iconKey: string): string => iconKey.replace(/-/g, ' ');
}
