import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message?: any, ...optionalParams: any[]): void {
    // eslint-disable-next-line no-console
    console.log(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    // eslint-disable-next-line no-console
    console.error(message, ...optionalParams);
  }
}
