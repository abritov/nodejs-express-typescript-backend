import { ILoggerInstance } from "./logger";

export class ConsoleLogger implements ILoggerInstance {
  private static instance: ConsoleLogger;

  public getInstance(): ConsoleLogger {
    if (ConsoleLogger.instance === null) {
      ConsoleLogger.instance = new ConsoleLogger();
    }
    return ConsoleLogger.instance;
  }

  public log(...args: any) {
    // tslint:disable-next-line:no-console
    console.log(...args);
  }

  public error(...args: any) {
    // tslint:disable-next-line:no-console
    console.error(...args);
  }
}
