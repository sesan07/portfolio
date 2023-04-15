import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    isDropdownOpen: boolean = false;

    @HostBinding('class.shrink-header')
    get shrinkHeader(): boolean {
        return !this._isAtTop;
    }

    private _isAtTop: boolean = true;

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        this._isAtTop = window.scrollY === 0;
    }
}
