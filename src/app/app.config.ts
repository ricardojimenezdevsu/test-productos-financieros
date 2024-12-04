import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

function updateContentTypeHeader(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  let headers = req.headers.append('Content-Type', 'application/json');
  const newReq = req.clone({
    headers,
  });
  return next(newReq);
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([updateContentTypeHeader])),
  ],
};
