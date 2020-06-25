import {error, getInput} from "@actions/core";
import {ReporterError} from "./error";

export const githubToken = getInput('github-token');
export const resultFile = getInput('result-file');
export const actionName = getInput('action-name');
export const outputName = getInput('output-name');

if (!githubToken) {
  error(new ReporterError('REQUIRED', 'github-token'));
  process.exit(1);
}
