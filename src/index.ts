import {error, setFailed} from "@actions/core";
import {readResult} from "./readResult";
import {resultFile} from "./config";
import {report} from "./report";
import {parse} from "./parse";

readResult(resultFile)
  .then(result => report(parse(result)))
  .catch(e => {
    error(e);
    setFailed(e.message);
  });
