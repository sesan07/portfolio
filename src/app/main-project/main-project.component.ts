import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
} from '@angular/core';
import { CloudinaryImage } from '@cloudinary/url-gen';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Project } from '../app.types';

@Component({
    selector: 'app-main-project',
    templateUrl: './main-project.component.html',
    styleUrls: ['./main-project.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectComponent implements OnInit {
    @Input() project!: Project;
    @Input() isInverted?: boolean;

    public image!: CloudinaryImage;
    public readonly descriptionAnimationDelay: number = 150;

    constructor(public elementRef: ElementRef<HTMLElement>, private _cldService: CloudinaryService) {}

    ngOnInit(): void {
        this.image = this._cldService.getImage(this.project.cardImageSrc);
    }
}
