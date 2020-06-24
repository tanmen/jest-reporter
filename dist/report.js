"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = void 0;
const github_1 = require("@actions/github");
const config_1 = require("./config");
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const sha = (_b = (_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.sha) !== null && _b !== void 0 ? _b : github_1.context.sha;
const octokit = github_1.getOctokit(config_1.accessToken);
const home = '/home/runner/work/';
exports.report = ({ success, total, passed, failed, time, results }) => octokit
    .checks
    .create({
    ...github_1.context.repo,
    head_sha: sha,
    name: 'Jest Reporter',
    status: 'completed',
    conclusion: success ? 'success' : 'failure',
    output: {
        title: 'Jest Test Results',
        summary: '#### These are all the test results I was able to find from your jest report\n' +
            `**${total}** tests were completed in **${time}s** with **${passed}** passed and **${failed}** failed tests.`,
        annotations: results.map(result => ({
            path: result.path.replace(home, ''),
            start_line: result.location.line,
            end_line: result.location.column,
            annotation_level: 'failure',
            title: result.title,
            message: strip_ansi_1.default(result.message)
        }))
    },
});
