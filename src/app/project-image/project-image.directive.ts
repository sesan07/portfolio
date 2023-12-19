import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[appProjectImage]',
    standalone: true,
})
export class ProjectImageDirective implements OnInit {
    @Input({ required: true }) imgSrc!: string;
    @Input({ required: true }) imgWidthPairs!: [number, number][];
    @Input({ required: true }) defaultImgWidth!: number;

    #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    #renderer = inject(Renderer2);

    ngOnInit(): void {
        this.#renderer.setAttribute(this.#elementRef.nativeElement, 'src', this.#getImgSrcUrl(this.defaultImgWidth));
        this.#renderer.setAttribute(this.#elementRef.nativeElement, 'srcset', this.#getImgSrcSet());
        this.#renderer.setAttribute(this.#elementRef.nativeElement, 'sizes', this.#getImgSizes());
    }

    #getImgSrcUrl(width: number): string {
        return `${environment.cloudinaryURL}/w_${width}/${this.imgSrc}.webp`;
    }
    #getImgSrcSet(): string {
        const imgWidths: number[] = this.imgWidthPairs.map(([, w]) => w);
        return imgWidths
            .map(width => `${this.#getImgSrcUrl(width)} ${width}w`)
            .concat(this.#getImgSrcUrl(this.defaultImgWidth))
            .join(', ');
    }
    #getImgSizes(): string {
        return this.imgWidthPairs
            .map(([mw, w]) => `(max-width: ${mw}px) ${w}px`)
            .concat(`${this.defaultImgWidth}px`)
            .join(', ');
    }
}
