import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { LogsService, OriginError } from './logs.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const logsService = inject(LogsService);
  return next(req).pipe(
    tap({
      error: (error: any) => {
        console.log('--- HTTP ERROR INTERCEPTOR TAP ---');
        (error as any).__fromInterceptor = true;
        logsService.handleLogError(error, OriginError.HTTP_INTERCEPTOR);
      },
    })
    // catchError((error: HttpErrorResponse) => {
    //   console.log('--- HTTP ERROR INTERCEPTOR ---');
    //   return throwError(() => error);
    // })
  );
};
