import octokit from "../octokit";

export async function getUpstreamOwner(
  owner: string,
  repo: string
): Promise<string | undefined> {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  return response.data.parent?.owner.login;
}
