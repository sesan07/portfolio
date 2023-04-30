import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[appProjectImage]',
})
export class ProjectImageDirective implements OnInit {
    @Input() imgSrc!: string;
    @Input() imgWidthPairs!: [number, number][];
    @Input() defaultImgWidth!: number;

    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    ngOnInit(): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'src', this._getImgSrcUrl(this.defaultImgWidth));
        this._renderer.setAttribute(this._elementRef.nativeElement, 'srcset', this._getImgSrcSet());
        this._renderer.setAttribute(this._elementRef.nativeElement, 'sizes', this._getImgSizes());
    }

    private _getImgSrcUrl(width: number): string {
        return `${environment.cloudinaryURL}/w_${width}/${this.imgSrc}.jpg`;
    }
    private _getImgSrcSet(): string {
        const imgWidths: number[] = this.imgWidthPairs.map(([_, w]) => w);
        return imgWidths
            .map(width => `${this._getImgSrcUrl(width)} ${width}w`)
            .concat(this._getImgSrcUrl(this.defaultImgWidth))
            .join(', ');
    }
    private _getImgSizes(): string {
        return this.imgWidthPairs
            .map(([mw, w]) => `(max-width: ${mw}px) ${w}px`)
            .concat(`${this.defaultImgWidth}px`)
            .join(', ');
    }
}
