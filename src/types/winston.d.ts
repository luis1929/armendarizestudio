declare module 'winston' {
  interface LogEntry {
    timestamp?: string;
    level: string;
    message: string;
  }

  interface LoggerOptions {
    level?: string;
    format?: Format;
    transports?: Transport[];
  }

  interface Format {
    timestamp(): Format;
    printf(fn: (entry: LogEntry) => string): Format;
    combine(...formats: Format[]): Format;
  }

  interface Transport {
    new(): Transport;
  }

  interface Logger {
    log(entry: LogEntry): void;
  }

  const format: {
    timestamp(): Format;
    printf(fn: (entry: LogEntry) => string): Format;
    combine(...formats: Format[]): Format;
  };

  const transports: {
    Console: new () => Transport;
  };

  function createLogger(options: LoggerOptions): Logger;

  export { format, transports, createLogger, LogEntry, LoggerOptions };
  export default { format, transports, createLogger };
}
