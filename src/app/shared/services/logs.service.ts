import { Injectable } from '@angular/core';

export enum LogSeverity {
  LOG = 'log',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
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
    originError: any,
    severity: LogSeverity = LogSeverity.ERROR
  ): void {
    const loggerPayload = this.generateMessage(payload, originError);
    console[severity]('<<<< ENVIANDO TRAZA AL BM-LOGGER ---', loggerPayload);
    console.log('---', payload?.__fromGlobalError, payload?.__fromInterceptor, originError);  
}

  private generateMessage(payload: any, originError: any): any {
    return {
      timestamp: new Date(),
      originError,
      payload,
    };
  }
}
