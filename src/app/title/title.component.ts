import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
    @Input() numStripes: number = 3;
}
