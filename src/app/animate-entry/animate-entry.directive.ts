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

    #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    #renderer = inject(Renderer2);
    #isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    #observer!: IntersectionObserver;

    ngAfterViewInit(): void {
        if (!this.#isBrowser) {
            return;
        }

        this.#renderer.addClass(this.#elementRef.nativeElement, 'hidden');
        this.#observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        this.#renderer.removeClass(this.#elementRef.nativeElement, 'hidden');
                        this.#renderer.addClass(this.#elementRef.nativeElement, this.animation);
                    }, this.delay);

                    this.#observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        this.#observer.observe(this.target ?? this.#elementRef.nativeElement);
    }

    ngOnDestroy(): void {
        if (!this.#isBrowser) {
            return;
        }
        this.#observer.disconnect();
    }
}
