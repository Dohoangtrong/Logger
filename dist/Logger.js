"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = exports.titleBold = exports.errorColor = exports.warnColor = exports.infoColor = exports.debugColor = void 0;
const util_1 = __importDefault(require("util"));
const ANSI_CODES = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    orange: '\x1b[48:5:166m',
};
const debugColor = (msg) => ANSI_CODES.magenta + msg + ANSI_CODES.reset;
exports.debugColor = debugColor;
const infoColor = (msg) => ANSI_CODES.cyan + msg + ANSI_CODES.reset;
exports.infoColor = infoColor;
const warnColor = (msg) => ANSI_CODES.orange + msg + ANSI_CODES.reset;
exports.warnColor = warnColor;
const errorColor = (msg) => ANSI_CODES.red + msg + ANSI_CODES.reset;
exports.errorColor = errorColor;
const titleBold = (msg) => ANSI_CODES.bold + msg + ANSI_CODES.reset;
exports.titleBold = titleBold;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["debug"] = 0] = "debug";
    LogLevel[LogLevel["info"] = 1] = "info";
    LogLevel[LogLevel["warn"] = 2] = "warn";
    LogLevel[LogLevel["error"] = 3] = "error";
    LogLevel[LogLevel["fatal"] = 4] = "fatal";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const noop = () => { };
function getTimestamp() {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    return timestamp;
}
class Logger {
    // log level display 
    // debug < info < warn < error < fatal
    logLevel;
    constructor(logLevel = LogLevel.debug) {
        this.logLevel = logLevel;
    }
    get isDebug() {
        if (this.logLevel == LogLevel.debug) {
            return true;
        }
        return false;
    }
    getLoggerMessage({ args = [], trim = !this.isDebug }) {
        return args
            .flat(Infinity)
            .map(arg => {
            if (typeof arg === 'string') {
                if (trim && arg.length > 100) {
                    return (arg.slice(0, 100) +
                        '...\n' +
                        '<Message is too long. Enable DEBUG=1 to see the full message.>');
                }
                return arg;
            }
            else if (typeof arg === 'object' && arg?.stack != null) {
                return arg.stack;
            }
            return util_1.default.inspect(arg);
        })
            .join(' ');
    }
    // log method
    log(...args) {
        if (this.logLevel > LogLevel.info) {
            return noop();
        }
        const message = this.getLoggerMessage({
            args,
        });
        const fullMessage = `[${getTimestamp()}] ${message}`;
        if (process?.stderr?.write(fullMessage + '\n')) {
            return;
        }
        console.log(fullMessage);
    }
    // warn method 
    warn(...args) {
        if (this.logLevel > LogLevel.warn) {
            return noop();
        }
        const message = this.getLoggerMessage({
            args,
        });
        const fullMessage = `[${getTimestamp()}] ${(0, exports.titleBold)("WARN")}: ⚠️  ${(0, exports.warnColor)(message)}`;
        if (process?.stderr?.write) {
            process.stderr.write(fullMessage + '\n');
            return;
        }
        console.warn(fullMessage);
    }
    // info method
    info(...args) {
        if (this.logLevel > LogLevel.info) {
            return noop();
        }
        const message = this.getLoggerMessage({
            args,
        });
        const fullMessage = `[${getTimestamp()}] ${(0, exports.titleBold)("INFO")}: 💡 ${(0, exports.infoColor)(message)}`;
        if (typeof process?.stderr?.write === 'function') {
            process.stderr.write(fullMessage + '\n');
            return;
        }
        console.info(fullMessage);
    }
    // error method
    error(...args) {
        if (this.logLevel > LogLevel.error) {
            return noop();
        }
        const message = this.getLoggerMessage({
            args,
            trim: false,
        });
        const fullMessage = `[${getTimestamp()}] ${(0, exports.titleBold)("ERROR")}: 💥 ${(0, exports.errorColor)(message)}`;
        if (typeof process?.stderr?.write === 'function') {
            process.stderr.write(fullMessage + '\n');
            return;
        }
        console.error(fullMessage);
    }
    // debug method
    debug(...args) {
        if (this.logLevel > LogLevel.debug) {
            return noop();
        }
        if (this.isDebug) {
            const message = this.getLoggerMessage({
                args,
                trim: false,
            });
            const fullMessage = `[${getTimestamp()}] ${(0, exports.titleBold)("DEBUG")}: 🐛 ${(0, exports.errorColor)(message)}`;
            if (typeof process?.stderr?.write === 'function') {
                process.stderr.write(fullMessage + '\n');
                return;
            }
            console.debug(fullMessage);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map