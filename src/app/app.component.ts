import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { FlickityDirective } from './ngx-flickity/ngx-flickity.directive';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FlickityDirective,
        NgSwitch,
        NgSwitchDefault,
        NgSwitchCase,
    ],
})
export class AppComponent {
  title = 'ngx-metafizzy-flickity';
}
