"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readResult = void 0;
const fs_extra_1 = require("fs-extra");
const error_1 = require("./error");
exports.readResult = (path) => fs_extra_1.readFile(path, 'utf-8')
    .catch(e => {
    if ((e === null || e === void 0 ? void 0 : e.code) === "ENOENT") {
        throw new error_1.ReporterError('NOT_FOUND', path);
    }
    throw e;
})
    .then(data => JSON.parse(data))
    .catch(e => {
    if (e instanceof SyntaxError) {
        throw new error_1.ReporterError('UNSUPPORTED', path);
    }
    throw e;
});
