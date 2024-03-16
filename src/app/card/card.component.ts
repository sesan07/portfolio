import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Badge, Link } from '../app.types';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { ProjectImageDirective } from '../project-image/project-image.directive';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ProjectImageDirective, LinkButtonComponent],
})
export class CardComponent {
    @Input({ required: true }) cardTitle: string = '';
    @Input({ required: true }) description: string = '';
    @Input({ required: true }) links: Link[] = [];
    @Input() imageSrc?: string;
    @Input() badges?: Badge[] = [];
    @Input() year?: number;

    readonly defaultImgWidth: number = 1080;
    readonly imgWidthPairs: [number, number][] = [[600, 700]]; // [media query max-width, img width]

    getIcon = (iconKey: string): string => `assets/image/${iconKey}.webp`;
}
