import { getRepos, getBumpPR, getWorkflowResult, getSyncStatus } from "./index";

interface repoStatus {
  workflowStatus: string;
  syncStatus: boolean;
}
export type Statuses = {
  [repo: string]: repoStatus;
};

export type Data = {
  repos: string[];
  statuses: Statuses;
};

export async function getStatus(
  owner: string = "patternfly-extension-testing"
): Promise<Data> {
  const repos = await getRepos(owner);
  const workflowResults = repos.map(async (repo) => {
    const bumpNumber = await getBumpPR(repo, owner);
    const syncStatus = await getSyncStatus(repo, "main");

    if (bumpNumber) {
      return {
        workflowStatus: await getWorkflowResult(bumpNumber, repo, owner),
        syncStatus,
      };
    } else {
      return {
        workflowStatus: "Error attempting to get status",
        syncStatus: false,
      };
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
