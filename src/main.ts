import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import localeBr from '@angular/common/locales/br';
import { LOCALE_ID } from '@angular/core';

import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeBr, 'br');

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [{ provide: LOCALE_ID, useValue: 'br' }],
  })
  .catch((err) => console.error(err));
