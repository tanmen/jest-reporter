import {readResult} from "../readResult";
import * as path from "path";
import {ReporterError} from "../error";

it('should be read file', () =>
  expect(readResult(path.resolve(__dirname, 'result.json')))
    .resolves.toHaveProperty('numFailedTestSuites', 1));

it('should be throw if not found', () => {
  const resultPath = path.resolve(__dirname, 'notfound.json');
  return expect(readResult(resultPath))
    .rejects.toThrowError(new ReporterError('NOT_FOUND', resultPath));
});

it('should be throw unless json format', () => {
  const resultPath = path.resolve(__dirname, 'any.json');
  return expect(readResult(resultPath))
    .rejects.toThrowError(new ReporterError('UNSUPPORTED', resultPath));
});
