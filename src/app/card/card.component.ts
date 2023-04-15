import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { CloudinaryService } from '../services/cloudinary.service';

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
    @Input() showHeaderDiagonal?: boolean;
    @Input() showFooterDiagonal?: boolean;

    public image?: CloudinaryImage;
    constructor(private _cldService: CloudinaryService) {}

    ngOnInit(): void {
        if (this.imageSrc) {
            this.image = this._cldService.getImage(this.imageSrc);
        }
    }

    getIcon(iconKey: string): string {
        return `assets/image/${iconKey}.png`;
    }

    getIconName(iconKey: string): string {
        return iconKey.replace(/-/g, ' ');
    }
}
