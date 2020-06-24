"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
exports.parse = (result) => {
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
            .map(assertion => {
            var _a, _b, _c, _d, _e, _f;
            return ({
                path: res.name,
                location: {
                    line: (_b = (_a = assertion.location) === null || _a === void 0 ? void 0 : _a.line) !== null && _b !== void 0 ? _b : 0,
                    column: (_d = (_c = assertion.location) === null || _c === void 0 ? void 0 : _c.column) !== null && _d !== void 0 ? _d : 0,
                },
                title: assertion.ancestorTitles.concat(assertion.title).join(" > "),
                message: (_f = (_e = assertion.failureMessages) === null || _e === void 0 ? void 0 : _e.join("\n\n")) !== null && _f !== void 0 ? _f : "",
            });
        })).flat()
    };
};
