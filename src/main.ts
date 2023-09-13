/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'br');

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [{ provide: LOCALE_ID, useValue: 'br' }],
  })
  .catch((err) => console.error(err));
