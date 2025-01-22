export declare const debugColor: (msg: string) => string;
export declare const infoColor: (msg: string) => string;
export declare const warnColor: (msg: string) => string;
export declare const errorColor: (msg: string) => string;
export declare const titleBold: (msg: string) => string;
export declare enum LogLevel {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3,
    fatal = 4
}
export declare class Logger {
    logLevel: LogLevel;
    constructor(logLevel?: LogLevel);
    private get isDebug();
    private getLoggerMessage;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
}
//# sourceMappingURL=Logger.d.ts.map