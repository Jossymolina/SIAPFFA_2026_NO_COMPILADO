import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withHashLocation  } from '@angular/router';

import { routes } from './app.routes';


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withHashLocation()),
         provideAnimationsAsync(),
      providePrimeNG({
      theme: {
        preset: Aura
      }
    }),   
    provideHttpClient()
    ]
};
