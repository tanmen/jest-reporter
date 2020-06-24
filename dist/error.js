"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporterError = exports.Errors = void 0;
exports.Errors = {
    REQUIRED: 'Please set',
    NOT_FOUND: 'No such file',
    UNSUPPORTED: 'Unsupported format',
};
class ReporterError extends Error {
    constructor(code, value) {
        super(`[${code}]: ${exports.Errors[code]} ${value}`);
        this.code = code;
        this.value = value;
    }
}
exports.ReporterError = ReporterError;
