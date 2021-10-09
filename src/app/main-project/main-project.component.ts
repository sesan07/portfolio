import { Component, Input } from '@angular/core';
import { Project } from '../services/project.service.types';

@Component({
    selector: 'app-main-project',
    templateUrl: './main-project.component.html',
    styleUrls: ['./main-project.component.scss']
})
export class MainProjectComponent {
    @Input() project!: Project;
}
