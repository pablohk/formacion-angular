import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ERROR_OBJECT {
  payload: any;
  originError: OriginError;
  severity?: LogSeverity;
}

export enum LogSeverity {
  LOG = 'log',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export enum OriginError {
  $BM_GLOBAL_ERROR_HANDLER = '$BM_GLOBAL_ERROR_HANDLER',
  $BM_HTTP_INTERCEPTOR = '$BM_HTTP_INTERCEPTOR',
  $BM_EVENT_LISTENER_ERROR = '$BM_EVENT_LISTENER_ERROR',
  $BM_EVENT_LISTENER_UNHANDLED_REJECTION = '$BM_EVENT_LISTENER_UNHANDLED_REJECTION',
  $BM_MANUALLY_ERROR = '$BM_MANUALLY_ERROR',
  $BM_CONSOLE_ERROR = '$BM_CONSOLE_ERROR',
  $BM_UNKNOWN_ERROR = '$BM_UNKNOWN_ERROR',
}

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor() {}
  /** inyectamos el bm-logger */

  /** publcamos metodos para el log, error, warn, info, debug */
  public handleLog(errorObj: ERROR_OBJECT): void {
    const loggerPayload = this.generateLogObject(errorObj);
    this.propagateErrorToConsole(errorObj);
    console.warn(
      `<<<< ENVIANDO TRAZA AL BM-LOGGER [${loggerPayload?.originError}] [${loggerPayload.severity}]`,
      `payload: ${JSON.stringify(loggerPayload.payload)}`,
    );
    // console.log(
    //   '---',
    //   'fromGlobalError:',
    //   errorObj?.payload?.[OriginError.$BM_GLOBAL_ERROR_HANDLER],
    //   'fromInterceptor:',
    //   errorObj?.payload?.[OriginError.$BM_HTTP_INTERCEPTOR],
    //   'fromListener:',
    //   loggerPayload?.payload?.[OriginError.$BM_EVENT_LISTENER_ERROR],
    //   'fromListenerUnhandledRejection:',
    //   loggerPayload?.payload?.[OriginError.$BM_EVENT_LISTENER_UNHANDLED_REJECTION],
    //   'fromConsoleError:',
    //   loggerPayload?.payload?.[OriginError.$BM_CONSOLE_ERROR],
    //   'fromManual:',
    //   loggerPayload?.payload?.[OriginError.$BM_MANUALLY_ERROR],
    //   'fromUnknown:',
    //   loggerPayload?.payload?.[OriginError.$BM_UNKNOWN_ERROR],
    // );
  }

  /**
   *  Propaga el error al console.error para que pueda ser capturado por herramientas de monitoreo
   * @param errorObj
   */
  private propagateErrorToConsole(errorObj: ERROR_OBJECT): void {
    if (errorObj?.severity === LogSeverity.ERROR) {
      console.error(errorObj?.originError, errorObj?.payload);
    }
  }

  private generateMessage(payload: any): any {
    try {
      const stackTrace = payload?.stack?.toString();
      return {
        timestamp: new Date(),
        mensajeErrordescritivo:
          payload instanceof HttpErrorResponse
            ? JSON.stringify(payload)
            : stackTrace || payload.toString(),
      };
    } catch (error) {
      return {
        timestamp: new Date(),
        mensajeErrordescritivo: '[No se pudo generar el mensaje del log]',
      };
    }
  }

  private generateLogObject(errorObj: ERROR_OBJECT): ERROR_OBJECT {
    errorObj?.severity === LogSeverity.ERROR &&
      this.createPatchedError(errorObj?.originError, errorObj?.payload);

    return {
      payload: this.generateMessage(errorObj?.payload),
      originError: errorObj?.originError || OriginError.$BM_UNKNOWN_ERROR,
      severity: errorObj?.severity || LogSeverity.ERROR,
    };
  }

  private createPatchedError(originError: OriginError, nativeError: any): void {
    if (typeof nativeError !== 'object') {
      return;
    }
    (nativeError as any)[originError] = true;
  }

  public searchFlagInNativeError(
    nativeError: any,
    OriginError: OriginError,
  ): boolean {
    return !!(nativeError as any)?.[OriginError];
  }
}
