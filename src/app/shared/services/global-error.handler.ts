import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogsService } from './logs.service';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly logsService = inject(LogsService);

  constructor(private ngZone: NgZone) {
    this.setupUnhandledErrorHandlers();
    this.setupConsoleInterception();
  }

  handleError(error: Error | HttpErrorResponse): void {
    console.log('--- GLOBAL ERROR HANDLER ---');
    (error as any).__fromGlobalError = true;
    if (!(error as any)?.__fromInterceptor) {
      this.logsService.handleLogError(error, 'GlobalErrorHandler');
    }
  }

  private setupUnhandledErrorHandlers(): void {
    // Errores no capturados globales
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('error', (event: ErrorEvent) => {
        console.log('--- LISTENER ERROR EVENT ---');
        (event?.error as any).__fromListener = true;
        this.logsService.handleLogError(event?.error, 'eventListener-error');
      });

      // Promise rejections no manejadas
      window.addEventListener(
        'unhandledrejection',
        (event: PromiseRejectionEvent) => {
          console.log('--- LISTENER UNHANDLED EVENT ---');
          (event?.reason as any).__fromListener = true;
          this.logsService.handleLogError(event?.reason, 'eventListener-error');
        }
      );
    });
  }

  private setupConsoleInterception(): void {
    try {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        originalError.apply(console, args);
        const lastArg: any = args?.slice(-1)[0];
        const isErrorInstance = lastArg instanceof Error;
        const notFired =
          !lastArg?.payload?.__fromInterceptor &&
          !lastArg?.payload?.__fromGlobalError &&
          !lastArg?.payload?.__fromListener &&
          lastArg?.originError !== 'console-error';

        if (notFired || (notFired && isErrorInstance)) {
          console.info('--- CONSOLA EVENT ---');
          this.logsService.handleLogError(lastArg, 'console-error');
        }
      };
    } catch (error) {
        console.info('--- ERROR INTERCEPTING CONSOLE ---', error);
    }
  }
}
