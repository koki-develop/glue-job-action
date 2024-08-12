import {
  GetJobRunCommand,
  GlueClient,
  JobRunState,
  StartJobRunCommand,
} from "@aws-sdk/client-glue";

export type RunOptions = {
  job: string;
  arguments: Record<string, string>;
};

export const runJob = async (options: RunOptions): Promise<string> => {
  const client = new GlueClient();

  const response = await client.send(
    new StartJobRunCommand({
      JobName: options.job,
      Arguments: options.arguments,
    }),
  );

  // biome-ignore lint/style/noNonNullAssertion:
  return response.JobRunId!;
};

export const waitForJob = async (job: string, jobId: string): Promise<void> => {
  const client = new GlueClient();

  while (true) {
    const response = await client.send(
      new GetJobRunCommand({
        JobName: job,
        RunId: jobId,
      }),
    );
    // biome-ignore lint/style/noNonNullAssertion:
    const run = response.JobRun!;
    // biome-ignore lint/style/noNonNullAssertion:
    const status = run.JobRunState!;

    switch (status) {
      case JobRunState.RUNNING:
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        break;
      case JobRunState.SUCCEEDED:
        return;
      case JobRunState.FAILED:
        throw new Error(`Job ${jobId} failed`);
      default:
        throw new Error(`Unexpected job status: ${status}`);
    }
  }
};
