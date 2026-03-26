import octokit from "../octokit";

export async function getPreviewUrl(
  prNumber: number,
  repo: string,
  owner: string = "patternfly-extension-testing"
): Promise<string> {
  if (prNumber === 0) {
    return "";
  }

  const res = await octokit
    .request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner,
      repo,
      issue_number: prNumber,
    })
    .catch((err) => {
      console.error(err);
      return { status: err.status, data: [] };
    });

  if (res.status !== 200) {
    return "";
  }

  for (const comment of res.data) {
    const match = comment.body?.match(/https?:\/\/[^\s)]*\.surge\.sh[^\s)]*/);
    if (match) {
      return match[0];
    }
  }

  return "";
}
