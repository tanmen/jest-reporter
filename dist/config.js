"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultFile = exports.accessToken = void 0;
const core_1 = require("@actions/core");
const error_1 = require("./error");
exports.accessToken = core_1.getInput('github-token');
exports.resultFile = core_1.getInput('result-file');
if (!exports.accessToken) {
    core_1.error(new error_1.ReporterError('REQUIRED', 'github-token'));
    process.exit(1);
}
