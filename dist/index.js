"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const readResult_1 = require("./readResult");
const config_1 = require("./config");
const report_1 = require("./report");
const parse_1 = require("./parse");
readResult_1.readResult(config_1.resultFile)
    .then(result => report_1.report(parse_1.parse(result)))
    .catch(e => {
    core_1.error(e);
    core_1.setFailed(e.message);
});
