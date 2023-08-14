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
    console.log(res);
    return "";
  }

  const triggerPR = res.data.workflow_runs.find((run) => {
    const { pull_requests, status } = run;
    if (pull_requests && status) {
      const lastPR = pull_requests[0];

      return lastPR?.number === PRNumber;
    }
    return false;
  });

  if (triggerPR?.conclusion) {
    return triggerPR.conclusion;
  } else if (triggerPR?.status) {
    return triggerPR.status;
  }

  return "";
}
