import {context, getOctokit} from "@actions/github";
import {accessToken} from "./config";
import {Results} from "./parse";
import stripAnsi from "strip-ansi";

const sha = context.payload.pull_request?.head.sha ?? context.sha;
const octokit = getOctokit(accessToken);
const home = `${process.cwd()}/`;

export const report = ({success, total, passed, failed, time, results}: Results) =>
  octokit
    .checks
    .create({
      ...context.repo,
      head_sha: sha,
      name: 'Jest Reporter',
      status: 'completed',
      conclusion: success ? 'success' : 'failure',
      output: {
        title: 'Jest Test Results',
        summary: '#### These are all the test results I was able to find from your jest report\n' +
          `**${total}** tests were completed in **${time}s** with **${passed}** passed and **${failed}** failed tests.`,
        annotations: results.map(result => ({
          path: result.path.replace(home, ''),
          start_line: result.location.line,
          end_line: result.location.column,
          annotation_level: 'failure',
          title: result.title,
          message: stripAnsi(result.message)
        }))
      },
    });
