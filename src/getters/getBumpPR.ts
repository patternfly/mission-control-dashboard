import octokit from "../octokit";

export async function getBumpPR(
  repo: string,
  owner: string = "patternfly-extension-testing"
): Promise<number> {
  const res = await octokit
    .request("GET /repos/{owner}/{repo}/pulls", {
      repo,
      owner,
    })
    .catch((err) => {
      console.error(err);
      return { status: err.status, data: [] };
    });

  if (res.status !== 200) {
    console.log(res);
    return 0;
  }

  const pulls = res.data;
  const bumpPull = pulls.find(
    (pull) => pull.title === "chore(deps): update patternfly"
  );

  if (bumpPull) {
    return bumpPull.number;
  } else {
    return 0;
  }
}
