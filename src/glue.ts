import {
  GetJobRunCommand,
  GlueClient,
  JobRunState,
  StartJobRunCommand,
} from "@aws-sdk/client-glue";

const _client = new GlueClient();

export type RunOptions = {
  job: string;
  arguments: Record<string, string>;
};

export const runJob = async (options: RunOptions): Promise<string> => {
  const response = await _client.send(
    new StartJobRunCommand({
      JobName: options.job,
      Arguments: options.arguments,
    }),
  );

  // biome-ignore lint/style/noNonNullAssertion:
  return response.JobRunId!;
};

export const waitForJob = async (job: string, jobId: string): Promise<void> => {
  while (true) {
    const response = await _client.send(
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
