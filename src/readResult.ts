import {readFile} from "fs-extra";
import {FormattedTestResults} from "@jest/test-result";
import {ReporterError} from "./error";

export const readResult = (path: string): Promise<FormattedTestResults> => readFile(path, 'utf-8')
  .catch(e => {
    if (e?.code === "ENOENT") {
      throw new ReporterError('NOT_FOUND', path);
    }
    throw e;
  })
  .then<FormattedTestResults>(data => JSON.parse(data))
  .catch(e => {
    if (e instanceof SyntaxError) {
      throw new ReporterError('UNSUPPORTED', path);
    }
    throw e;
  });
