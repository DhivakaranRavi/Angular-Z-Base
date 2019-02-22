import 'zone.js/dist/zone.js';
import { environment } from './environment';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

environment.production ? enableProdMode() : [];
platformBrowserDynamic().bootstrapModule(AppModule);
