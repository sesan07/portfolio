import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAnimateEntry]',
    standalone: true,
})
export class AnimateEntryDirective implements AfterViewInit, OnDestroy {
    @Input() animation!: string;
    @Input() target?: HTMLElement;
    @Input() delay?: number;

    private _observer!: IntersectionObserver;

    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._elementRef.nativeElement, 'hidden');
        this._observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        this._renderer.removeClass(this._elementRef.nativeElement, 'hidden');
                        this._renderer.addClass(this._elementRef.nativeElement, this.animation);
                    }, this.delay);

                    this._observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        this._observer.observe(this.target ?? this._elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        this._observer.disconnect();
    }
}
