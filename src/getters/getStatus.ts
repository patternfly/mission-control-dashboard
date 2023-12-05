import {
  getRepos,
  getBumpPR,
  getWorkflowResult,
  getSyncStatus,
  getUpstreamOwner,
} from "./index";

export interface repoStatus {
  workflowStatus: string;
  syncStatus: string;
  bumpPRLink: string;
  upstreamOwnerLink: string;
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
    const bumpPRLink = `https://github.com/${owner}/${repo}/pull/${bumpNumber}`;

    const upstreamOwner = await getUpstreamOwner(owner, repo);
    const upstreamOwnerLink = `https://github.com/${
      upstreamOwner || owner
    }/${repo}`;

    const syncStatus = await getSyncStatus(repo, "main", owner, upstreamOwner);
    const workflowStatus = await getWorkflowResult(bumpNumber, repo, owner);

    return {
      workflowStatus,
      syncStatus,
      bumpPRLink,
      upstreamOwnerLink,
    };
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
