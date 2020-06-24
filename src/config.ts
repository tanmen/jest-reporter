import {error, getInput} from "@actions/core";
import {ReporterError} from "./error";

export const accessToken = getInput('github-token');
export const resultFile = getInput('result-file');

if (!accessToken) {
  error(new ReporterError('REQUIRED', 'github-token'));
  process.exit(1);
}
