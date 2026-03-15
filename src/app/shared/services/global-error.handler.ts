import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogSeverity, LogsService, OriginError } from './logs.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly logsService = inject(LogsService);

  constructor(private ngZone: NgZone) {
    this.setupUnhandledErrorHandlers();
    this.setupConsoleInterception();
  }

  /**
   *  Manejador global de errores que captura cualquier error que angular es capaz de caputar y que no es manejado en la aplicación.
   *  Se encarga de enviar la información del error al servicio de logs para su procesamiento y envío al bm-logger.
   *  Si el error ya ha sido marcado como proveniente del interceptor HTTP, se evita enviar una traza duplicada.
   * @param {Error | HttpErrorResponse} error - El error a manejar.
   */
  handleError(error: Error | HttpErrorResponse): void {
    console.log('--- GLOBAL ERROR HANDLER ---');
    if (
      !this.logsService.searchFlagInNativeError(
        error,
        OriginError.$BM_HTTP_INTERCEPTOR,
      )
    ) {
      this.logsService.handleLogError({
        payload: error,
        originError: OriginError.$$BM_GLOBAL_ERROR_HANDLER,
        severity: LogSeverity.ERROR,
      });
    }
  }

  /**
   * Configuración de listeners globales para capturar errores no manejados y promesas rechazadas
   * que no se capturan en el manejador global.
   * Esto permite detectar errores que ocurren fuera del contexto de Angular o que no son capturados
   * por el manejador global tradicional.
   * Se ejecuta fuera de Angular para evitar ciclos de detección de cambios innecesarios al manejar estos eventos.
   */
  private setupUnhandledErrorHandlers(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('error', (event: ErrorEvent) => {
        console.log('--- LISTENER ERROR EVENT ---');
        this.logsService.handleLogError({
          payload: event?.error,
          originError: OriginError.$BM_EVENT_LISTENER_ERROR,
          severity: LogSeverity.ERROR,
        });
      });

      window.addEventListener(
        'unhandledrejection',
        (event: PromiseRejectionEvent) => {
          console.log('--- LISTENER UNHANDLED EVENT ---');
          this.logsService.handleLogError({
            payload: event?.reason,
            originError: OriginError.$BM_EVENT_LISTENER_UNHANDLED_REJECTION,
            severity: LogSeverity.ERROR,
          });
          event.preventDefault();
        },
      );
    });
  }

  /**
   * Intercepción de console.error para capturar errores que se registran directamente en la consola
   * sin pasar por el manejador global o interceptor HTTP.
   * Esto es útil para detectar errores que los desarrolladores podrían estar registrando manualmente
   * sin lanzar excepciones.
   */
  private setupConsoleInterception(): void {
    let isIntercepting = false; // Flag para evitar recursión

    try {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        if (isIntercepting) {
          // originalError.apply(console, args);
          return;
        }
        isIntercepting = true;
        try {
          originalError.apply(console, args);
          const lastArg: any = args?.slice(-1)[0];

          const isErrorInstance = lastArg instanceof Error;
          const notFired =
            !this.logsService.searchFlagInNativeError(
              lastArg,
              OriginError.$BM_HTTP_INTERCEPTOR,
            ) &&
            !this.logsService.searchFlagInNativeError(
              lastArg,
              OriginError.$$BM_GLOBAL_ERROR_HANDLER,
            ) &&
            !this.logsService.searchFlagInNativeError(
              lastArg,
              OriginError.$BM_EVENT_LISTENER_ERROR,
            ) &&
            !this.logsService.searchFlagInNativeError(
              lastArg,
              OriginError.$BM_EVENT_LISTENER_UNHANDLED_REJECTION,
            ) &&
            lastArg?.originError !== OriginError.$BM_CONSOLE_ERROR;

          if (notFired || (notFired && isErrorInstance)) {
            console.info('--- CONSOLE INTERCEPTOR ---');
            this.logsService.handleLogError({
              payload: lastArg,
              originError: OriginError.$BM_CONSOLE_ERROR,
              severity: LogSeverity.ERROR,
            });
          }
        } finally {
          isIntercepting = false;
        }
      };
    } catch (error) {
      console.info('--- ERROR INTERCEPTING CONSOLE ---', error);
    }
  }
}
