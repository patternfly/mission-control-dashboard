import octokit from "../octokit";

export async function syncRepo(
  repo: string,
  owner: string = "patternfly-extension-testing"
): Promise<string> {
  const res = await octokit.rest.repos.mergeUpstream({
    owner,
    repo,
    branch: "main"
  });

  if (res.status !== 200) {
    console.log(res);
    return `ERROR: status code: ${res.status}`;
  }

  return "success";
}
