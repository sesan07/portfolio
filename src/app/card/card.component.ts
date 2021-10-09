import { Component, Input } from '@angular/core';
import { Badge } from '../services/project.service.types';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() cardTitle: string = '';
    @Input() description: string = '';
    @Input() githubLink?: string;
    @Input() openLink?: string;
    @Input() resumeLink?: string;
    @Input() imageSrc?: string;
    @Input() badges?: Badge[];
    @Input() year?: number;
    @Input() showHeaderDiagonal?: boolean;
    @Input() showFooterDiagonal?: boolean;

    getBadgeIcon(badge: Badge): string {
        switch (badge) {
            case Badge.ANDROID:
                return 'assets/image/android.png';
            case Badge.ANGULAR:
                return 'assets/image/angular.png';
            case Badge.C_SHARP:
                return 'assets/image/c-sharp.png';
            case Badge.DESKTOP:
                return 'assets/image/desktop.png';
            case Badge.KOTLIN:
                return 'assets/image/kotlin.png';
            case Badge.NG_ZORRO:
                return 'assets/image/ng-zorro.png';
            case Badge.PYTHON:
                return 'assets/image/python.png';
            case Badge.TAILWIND:
                return 'assets/image/tailwind.png';
            case Badge.UNITY:
                return 'assets/image/unity.png';
            default:
                throw 'Unknown badge';
        }
    }
}
