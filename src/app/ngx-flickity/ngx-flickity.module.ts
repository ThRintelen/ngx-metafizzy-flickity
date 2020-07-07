import { NgModule } from '@angular/core';
import { FlickityDirective } from './ngx-flickity.directive';

@NgModule({
  declarations: [FlickityDirective],
  exports: [FlickityDirective],
})
export class FlickityModule {}
