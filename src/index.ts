import {debug, setFailed} from "@actions/core";
import {resultFile} from "./config";
import {parse} from "./parse";
import {readResult} from "./readResult";
import {report} from "./report";

readResult(resultFile)
  .then(result => report(parse(result)))
  .then(response => debug(JSON.stringify(response)))
  .catch(e => setFailed(e.message));
