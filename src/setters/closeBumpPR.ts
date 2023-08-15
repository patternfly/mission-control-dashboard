import octokit from "../octokit";
import { getBumpPR } from "@/getters";

export async function closeBumpPR(
  repo: string,
  owner: string = "patternfly-extension-testing"
): Promise<string> {
  const pull_number = await getBumpPR(repo, owner);

  const res = await octokit.rest.pulls.update({
    repo,
    owner,
    pull_number,
    state: "closed",
  });

  if (res.status !== 200) {
    console.log(res);
    return `ERROR: status code: ${res.status}`;
  }

  return `success: ${pull_number} closed`;
}
