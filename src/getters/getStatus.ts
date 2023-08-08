import { getRepos, getBumpPR, getWorkflowResult } from "./index";

export type Statuses = {
  [repo: string]: string;
};

export type Data = {
  repos: string[];
  statuses: Statuses;
};

export async function getStatus(
  owner: string = 'patternfly-extension-testing'
): Promise<Data> {
  const repos = await getRepos(owner);
  const workflowResults = repos.map(async (repo) => {
    const bumpNumber = await getBumpPR(repo, owner);

    if (bumpNumber) {
      return getWorkflowResult(bumpNumber, repo, owner);
    } else {
      return "Error attempting to get status"
    }
  });

  const resolvedWorkflowResults = await Promise.all(workflowResults);

  const statuses = resolvedWorkflowResults.reduce(
    (acc: Statuses, result, i) => {
      acc[repos[i]] = result;
      return acc;
    },
    {}
  );

  return { repos, statuses };
}