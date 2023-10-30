import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(CommonModule, BrowserModule)]
})
  .catch(err => console.error(err));
