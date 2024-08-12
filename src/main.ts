import * as core from "@actions/core";
import { runJob, waitForJob } from "./glue";

export const parseArguments = (args: string): Record<string, string> => {
  return args
    .trim()
    .split("\n")
    .reduce<Record<string, string>>((acc, arg) => {
      const [key, value] = arg.split("=");
      return Object.assign(acc, { [key]: value });
    }, {});
};

export const main = async () => {
  try {
    const job = core.getInput("job");
    const args = parseArguments(core.getInput("arguments"));

    const jobId = await runJob({ job, arguments: args });
    core.info(`Job started: ${jobId}`);

    await waitForJob(job, jobId);
    core.info("Job completed");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      throw error;
    }
  }
};

await main();
