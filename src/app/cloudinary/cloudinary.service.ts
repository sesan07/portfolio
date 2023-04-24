import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CloudinaryService {
    private _cld: Cloudinary;

    constructor() {
        this._cld = new Cloudinary(environment.cloudinary);
    }

    getImage(stuff: string): CloudinaryImage {
        return this._cld.image(stuff);
    }
}
