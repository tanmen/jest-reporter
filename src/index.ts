import {debug, error, setFailed} from "@actions/core";
import {readResult} from "./readResult";
import {resultFile} from "./config";
import {report} from "./report";
import {parse} from "./parse";

debug(JSON.stringify(Object.keys(process.env)))
debug(process.env.GITHUB_JOB ?? '');
readResult(resultFile)
  .then(result => report(parse(result)))
  .then(response => debug(JSON.stringify(response)))
  .catch(e => {
    error(e);
    setFailed(e.message);
  });
