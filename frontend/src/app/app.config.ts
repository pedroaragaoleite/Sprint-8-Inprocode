import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DatePipe } from '@angular/common';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), DatePipe]
};


