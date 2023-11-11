import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, PLATFORM_ID, Renderer2, inject } from '@angular/core';

@Directive({
    selector: '[appAnimateEntry]',
    standalone: true,
})
export class AnimateEntryDirective implements AfterViewInit, OnDestroy {
    @Input() animation!: string;
    @Input() target?: HTMLElement;
    @Input() delay?: number;

    private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private _renderer = inject(Renderer2);
    private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    private _observer!: IntersectionObserver;

    ngAfterViewInit(): void {
        if (!this._isBrowser) {
            return;
        }

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
        if (!this._isBrowser) {
            return;
        }
        this._observer.disconnect();
    }
}
