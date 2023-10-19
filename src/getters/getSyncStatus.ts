import octokit from "../octokit";
import { getUpstreamOwner } from "./getUpstreamOwner";

export async function getSyncStatus(
  repo: string,
  branch: string,
  owner: string = "patternfly-extension-testing"
): Promise<string> {
  const res = await octokit
    .request("GET /repos/{owner}/{repo}/branches/{branch}", {
      owner,
      repo,
      branch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .catch((err) => {
      console.error(err);
      return { status: err.status, data: { commit: { parents: [] } } };
    });

  if (res.status !== 200) {
    console.log(res);
    return "Error attempting to get sync status";
  }

  const parentCommitSHAs = res.data.commit.parents.map((commit) => commit.sha);

  const upstreamOwner = await getUpstreamOwner(owner, repo);

  const upstreamRes = await octokit.request(
    "GET /repos/{owner}/{repo}/branches/{branch}",
    {
      owner: upstreamOwner || owner,
      repo,
      branch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .catch((err) => {
      console.error(err);
      return { status: err.status, data: { commit: { sha: "" } } };
    });

  const upstreamHeadCommit = upstreamRes.data.commit;

  const isSynced = parentCommitSHAs.some(
    (sha) => sha === upstreamHeadCommit.sha
  );

  return isSynced ? "synced" : "sync required";
}
