import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../app.types';

@Component({
    selector: 'app-link-button',
    standalone: true,
    imports: [],
    templateUrl: './link-button.component.html',
    styleUrl: './link-button.component.scss',
})
export class LinkButtonComponent implements OnInit {
    @Input({ required: true }) link!: Link;
    iconAsset: string = '';

    ngOnInit(): void {
        this.iconAsset = `assets/image/${this.link.icon}.webp`;
    }
}
