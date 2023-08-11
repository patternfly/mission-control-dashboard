import octokit from "../octokit";

export async function getSyncStatus(
  repo: string,
  branch: string,
  owner: string = "patternfly-extension-testing"
): Promise<number | boolean> {
  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/branches/{branch}",
    {
      owner,
      repo,
      branch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (res.status !== 200) {
    console.log(res);
    return false;
  }

  // const pulls = res.data;
  // const bumpPull = pulls.find(
  //   (pull) => pull.title === "chore(deps): update patternfly"
  // );

  // if (bumpPull) {
  //   return bumpPull.number;
  // } else {
  //   return 0;
  // }

  const parentCommitSHAs = res.data.commit.parents.map(commit => commit.sha)

  const upstreamRes = await octokit.request(
    "GET /repos/{owner}/{repo}/branches/{branch}",
    {
      owner: "patternfly",
      repo,
      branch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const upstreamHeadCommit = upstreamRes.data.commit;

  return parentCommitSHAs.some(sha => sha === upstreamHeadCommit.sha)
}
