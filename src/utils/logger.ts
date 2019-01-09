export interface ILogger {
  log(...args: any): void;
  error(...args: any): void;
}

export interface ILoggerInstance {
  getInstance(): ILogger;
}

export class LoggerAdapter {
  public static instance: ILoggerInstance;
}

export const logger = LoggerAdapter.instance.getInstance();
