import {context, getOctokit} from "@actions/github";
import stripAnsi from "strip-ansi";
import {actionName, githubToken} from "./config";
import {Results} from "./parse";
import {v4} from "uuid";
import {debug} from "@actions/core";

const sha = context.payload.pull_request?.head.sha ?? context.sha;
const octokit = getOctokit(githubToken);
const home = `${process.cwd()}/`;

export const report = async ({success, total, time, passed, failed, results}: Results) => {
  const output = {
    title: 'Jest Test Results',
    summary: '#### These are all the test results I was able to find from your jest report\n' +
      `**${total}** tests were completed in **${time}s** with **${passed}** passed and **${failed}** failed tests.`,
    text: `total: ${total}, time: ${time}, passed: ${passed}, failed: ${failed}`,
    annotations:
      results.map(result => ({
        path: result.path.replace(home, ''),
        start_line: result.location.line,
        end_line: result.location.line,
        start_column: result.location.column,
        end_column: result.location.column,
        annotation_level: 'failure' as 'failure',
        title: result.title,
        message: stripAnsi(result.message)
      }))
  };
  debug(`[output]${JSON.stringify(output, undefined, 2)}`);
  return octokit
    .checks
    .create({
      ...context.repo,
      head_sha: sha,
      name: stripAnsi(actionName),
      conclusion: success ? 'success' : 'failure',
      external_id: v4(),
      output
    })
};
