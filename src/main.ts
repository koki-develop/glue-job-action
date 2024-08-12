import * as core from "@actions/core";
import { runJob, waitForJob } from "./glue";

export const main = async () => {
  try {
    const inputs = {
      job: core.getInput("job"),
      arguments: core.getInput("arguments"),
    } as const;

    const args = inputs.arguments
      .trim()
      .split("\n")
      .reduce<Record<string, string>>((acc, arg) => {
        const [key, value] = arg.split("=");
        return Object.assign(acc, { [key]: value });
      }, {});

    const jobId = await runJob({ job: inputs.job, arguments: args });
    core.info(`Job started: ${jobId}`);

    await waitForJob(inputs.job, jobId);
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
