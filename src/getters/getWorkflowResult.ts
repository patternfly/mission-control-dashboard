import octokit from "../octokit";

export async function getWorkflowResult(
  PRNumber: number,
  repo: string,
  owner: string = "patternfly-extension-testing"
): Promise<string> {
  const res = await octokit.request("GET /repos/{owner}/{repo}/actions/runs", {
    owner,
    repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (res.status !== 200 || PRNumber === 0) {
    console.log(res)
    return "";
  }

  const { status } = res.data.workflow_runs.find(
    (run) => (run.pull_requests[0].number as number) === PRNumber
  );
  return status;
}