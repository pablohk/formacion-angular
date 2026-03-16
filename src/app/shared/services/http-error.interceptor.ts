import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LogSeverity, LogsService, OriginError } from './logs.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const logsService = inject(LogsService);
  return next(req).pipe(
    tap({
      error: (error: any) => {
        console.log('--- HTTP ERROR INTERCEPTOR TAP ---');
        logsService.handleLog({
          payload: error,
          originError: OriginError.$BM_HTTP_INTERCEPTOR,
          severity: LogSeverity.ERROR,
        });
      },
    }),
  );
};
