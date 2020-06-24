import {FormattedTestResults} from "@jest/test-result";

type AssertionResult = {
  path: string;
  location: {
    line: number;
    column: number;
  };
  title: string;
  message: string;
}

export type Results = {
  success: boolean;
  total: number;
  passed: number;
  failed: number;
  time: number;
  results: AssertionResult[];
}

export const parse = (result: FormattedTestResults): Results => {
  const endTime = result.testResults
    .reduce((previous, current) => current.endTime > previous ? current.endTime : previous, 0);
  return {
    success: result.success,
    total: result.numTotalTests,
    passed: result.numPassedTests,
    failed: result.numFailedTests,
    time: Math.floor((endTime - result.startTime) / 1000),
    results: result.testResults
      .map(res => res.assertionResults
        .filter(assertion => assertion.status === 'failed')
        .map(assertion => ({
          path: res.name,
          location: {
            line: assertion.location?.line ?? 0,
            column: assertion.location?.column ?? 0,
          },
          title: assertion.ancestorTitles.concat(assertion.title).join(" > "),
          message: assertion.failureMessages?.join("\n\n") ?? "",
        }))).flat()
  }
}
