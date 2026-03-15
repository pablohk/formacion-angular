import { Injectable } from '@angular/core';

export enum LogSeverity {
  LOG = 'log',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export enum OriginError {
  GLOBAL_ERROR_HANDLER,
  HTTP_INTERCEPTOR,
  EVENT_LISTENER_ERROR,
  EVENT_LISTENER_UNHANDLED_REJECTION,
  MANUAL,
  CONSOLE_ERROR,
}

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor() {}
  /** inyectamos el bm-logger */

  /** publcamos metodos para el log, error, warn, info, debug */
  public handleLogError(
    payload: any,
    originError: OriginError,
    severity: LogSeverity = LogSeverity.ERROR
  ): void {
    const loggerPayload = this.generateMessage(payload, originError);
    console.warn(`<<<< ENVIANDO TRAZA AL BM-LOGGER [${OriginError[originError]}] [${severity}]---`, loggerPayload);
    console.log('---fromGlobalError', payload?.__fromGlobalError, 'fromInterceptor', payload?.__fromInterceptor);  
}

  private generateMessage(payload: any, originError: OriginError): any {
    return {
      timestamp: new Date(),
      originError,
      payload,
    };
  }
}
