import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr'
import { provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask'
import { tokenHttpInterceptor } from './token-http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([tokenHttpInterceptor])),
    provideAnimations(),
    provideToastr(),
    provideNgxMask(),
    provideEnvironmentNgxMask(),
  ]
};
