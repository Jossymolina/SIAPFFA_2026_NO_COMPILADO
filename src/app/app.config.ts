import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withHashLocation  } from '@angular/router';

import { routes } from './app.routes';


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { PrimeNG } from 'primeng/config';
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
     providePrimeNG({
      theme: {
        preset: Aura
      },
      translation: {
        dayNames: [
          'Domingo', 'Lunes', 'Martes', 'Miércoles',
          'Jueves', 'Viernes', 'Sábado'
        ],
        dayNamesShort: [
          'Dom', 'Lun', 'Mar', 'Mié',
          'Jue', 'Vie', 'Sáb'
        ],
        dayNamesMin: [
          'Do', 'Lu', 'Ma', 'Mi',
          'Ju', 'Vi', 'Sa'
        ],
        monthNames: [
          'Enero', 'Febrero', 'Marzo', 'Abril',
          'Mayo', 'Junio', 'Julio', 'Agosto',
          'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthNamesShort: [
          'Ene', 'Feb', 'Mar', 'Abr',
          'May', 'Jun', 'Jul', 'Ago',
          'Sep', 'Oct', 'Nov', 'Dic'
        ],
        today: 'Hoy',
        clear: 'Limpiar',
        weekHeader: 'Sm'
      }
    }),
    provideHttpClient()
    ]
};
