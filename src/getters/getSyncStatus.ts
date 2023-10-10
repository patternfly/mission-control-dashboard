import octokit from "../octokit";
import { getUpstreamOwner } from "./getUpstreamOwner";

export async function getSyncStatus(
  repo: string,
  branch: string,
  owner: string = "patternfly-extension-testing"
): Promise<string> {
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
    return `ERROR: status code: ${res.status}`;
  }

  const parentCommitSHAs = res.data.commit.parents.map(commit => commit.sha)

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
    }
  );

  const upstreamHeadCommit = upstreamRes.data.commit;

  const isSynced = parentCommitSHAs.some(sha => sha === upstreamHeadCommit.sha);

  return isSynced ? 'synced' : 'sync required'
}
