import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink],
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
