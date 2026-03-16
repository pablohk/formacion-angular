import {
  ErrorHandler,
  inject,
  Injectable,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogSeverity, LogsService, OriginError } from './logs.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler, OnDestroy {
  private readonly logsService = inject(LogsService);
  private readonly ngZone = inject(NgZone);
  private errorListener?: (event: ErrorEvent) => void;
  private rejectionListener?: (event: PromiseRejectionEvent) => void;
  private consoleIntercepting = false;

  constructor() {
    this.initialize();
  }

  ngOnDestroy(): void {
    if (this.errorListener) {
      window.removeEventListener('error', this.errorListener);
    }
    if (this.rejectionListener) {
      window.removeEventListener('unhandledrejection', this.rejectionListener);
    }
  }

  /**
   *  Manejador global de errores que captura cualquier error que angular es capaz de caputar y que no es manejado en la aplicación.
   *  Se encarga de enviar la información del error al servicio de logs para su procesamiento y envío al bm-logger.
   *  Si el error ya ha sido marcado como proveniente del interceptor HTTP, se evita enviar una traza duplicada.
   * @param {Error | HttpErrorResponse} error - El error a manejar.
   */
  handleError(error: Error | HttpErrorResponse): void {
    console.log('--- GLOBAL ERROR HANDLER ---');
    if (this.hasErrorOrigin(error, OriginError.$BM_HTTP_INTERCEPTOR)) {
      return;
    }
    this.logError(error, OriginError.$BM_GLOBAL_ERROR_HANDLER);
  }

  /**
   * Inicialización del manejador global, configurando listeners para errores no manejados y la intercepción de console.error.
   * Esto permite capturar una amplia gama de errores que pueden ocurrir en la aplicación, incluso aquellos que no son capturados por Angular.
   * Se ejecuta fuera de Angular para evitar ciclos de detección de cambios innecesarios al manejar estos eventos.
   */
  private initialize(): void {
    this.setupUnhandledErrorHandlers();
    this.setupConsoleInterception();
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
      this.errorListener = (event: ErrorEvent) => {
        console.log('--- LISTENER ERROR EVENT ---');
        this.logError(event?.error, OriginError.$BM_EVENT_LISTENER_ERROR);
      };

      this.rejectionListener = (event: PromiseRejectionEvent) => {
        console.log('--- LISTENER UNHANDLED EVENT ---');
        this.logError(
          event?.reason,
          OriginError.$BM_EVENT_LISTENER_UNHANDLED_REJECTION,
        );
        event.preventDefault();
      };

      window.addEventListener('error', this.errorListener);
      window.addEventListener('unhandledrejection', this.rejectionListener);
    });
  }

  /**
   * Intercepción de console.error para capturar errores que se registran directamente en la consola
   * sin pasar por el manejador global o interceptor HTTP.
   * Esto es útil para detectar errores que los desarrolladores podrían estar registrando manualmente
   * sin lanzar excepciones.
   */
  private setupConsoleInterception(): void {
    try {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        if (this.consoleIntercepting) {
          return;
        }
        this.consoleIntercepting = true;
        try {
          originalError.apply(console, args);
          const IsAllStringArgs = args.every((arg) => typeof arg === 'string');
          const errorStack: any = IsAllStringArgs
            ? args.join(' ')
            : args?.slice(-1)[0];

          if (this.shouldLogConsoleError(errorStack)) {
            console.info('--- CONSOLE INTERCEPTOR ---');
            this.logError(errorStack, OriginError.$BM_CONSOLE_ERROR);
          }
        } finally {
          this.consoleIntercepting = false;
        }
      };
    } catch (error) {
      console.info('--- ERROR INTERCEPTING CONSOLE ---', error);
    }
  }

  /**
   *  Determina si un error capturado en console.error debe ser registrado en el servicio de logs.
   *  Evita registrar errores que ya han sido marcados como provenientes del interceptor HTTP o del manejador global
   *  para prevenir trazas duplicadas.
   * @param errorStack  - El stack o mensaje del error capturado en console.error.
   * @returns  boolean - true si el error debe ser registrado, false si ya ha sido registrado por otro mecanismo.
   */
  private shouldLogConsoleError(errorStack: any): boolean {
    const alreadyLogged = [
      OriginError.$BM_HTTP_INTERCEPTOR,
      OriginError.$BM_GLOBAL_ERROR_HANDLER,
      OriginError.$BM_EVENT_LISTENER_ERROR,
      OriginError.$BM_EVENT_LISTENER_UNHANDLED_REJECTION,
      OriginError.$BM_CONSOLE_ERROR,
    ].some((origin) => this.hasErrorOrigin(errorStack, origin));
    return !alreadyLogged;
  }

  /**
   *  Verifica si un error ya ha sido marcado con un origen específico para evitar registros duplicados en el servicio de logs.
   *  Esto es especialmente importante para errores que pueden ser capturados por múltiples mecanismos
   * (por ejemplo, un error HTTP que también se registra en console.error).
   * @param error - El error a verificar.
   * @param origin - El origen que se desea verificar en el error.
   * @returns   boolean - true si el error ya ha sido marcado con el origen especificado, false en caso contrario.
   */
  private hasErrorOrigin(error: any, origin: OriginError): boolean {
    return (
      this.logsService.searchFlagInNativeError(error, origin) ||
      error?.originError === origin
    );
  }

  /**
   *  Registra un error en el servicio de logs con la información del payload y el origen del error.
   *  Se utiliza para centralizar el proceso de registro de errores desde diferentes mecanismos de captura (manejador global, listeners, console.error).
   *  Esto asegura que todos los errores relevantes sean registrados de manera consistente en el servicio de logs, independientemente de cómo fueron capturados.
   * @param payload   - La información del error que se desea registrar, puede ser un objeto de error, un mensaje o cualquier dato relevante.
   * @param origin    - El origen del error, utilizado para categorizar y filtrar los logs en el servicio de logs.
   */
  private logError(payload: any, origin: OriginError): void {
    this.logsService.handleLogError({
      payload,
      originError: origin,
      severity: LogSeverity.ERROR,
    });
  }
}
