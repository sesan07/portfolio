import { Component, Input, OnInit } from '@angular/core';
import { CloudinaryImage } from '@cloudinary/url-gen';

import { Project } from '../services/project.service.types';
import { CloudinaryService } from '../services/cloudinary.service';

@Component({
    selector: 'app-main-project',
    templateUrl: './main-project.component.html',
    styleUrls: ['./main-project.component.scss']
})
export class MainProjectComponent implements OnInit {
    @Input() project!: Project;

    public image!: CloudinaryImage;
    constructor(private _cldService: CloudinaryService) {}

    ngOnInit(): void {
        this.image = this._cldService.getImage(this.project.cardImageSrc);
    }
}
