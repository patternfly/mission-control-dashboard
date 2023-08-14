import octokit from "../octokit";

export async function getRepos(
  owner: string = "patternfly-extension-testing"
): Promise<string[]> {
  const response = await octokit.request("GET /orgs/{owner}/repos", {
    owner,
  });

  if (response.status !== 200) {
    console.log(response);
    return [];
  }

  const repos = response.data.filter((repo: any) => repo.name !== "dashboard");

  return repos.map((repo: any) => repo.name);
}
