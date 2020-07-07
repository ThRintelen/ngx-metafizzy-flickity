import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FlickityModule } from './ngx-flickity/ngx-flickity.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, FlickityModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
