// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSyncStatus } from "@/getters";
import { syncRepo } from "@/setters";

type Data = {
  status: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const repoName = req.query.repo;
  const branch = req.query.branch;
  const owner = req.query.owner;

  if (
    typeof repoName !== "string" ||
    typeof branch !== "string" ||
    typeof owner === "object"
  ) {
    res.status(400).json(`ERROR: Invalid arguments`);
    return;
  }

  if (req.method === "GET") {
    const syncStatus = await getSyncStatus(repoName, branch, owner);
    res.status(200).json(syncStatus);
  } else if (req.method === "POST") {
    const syncResponse = await syncRepo(repoName, owner);
    res.status(200).json(syncResponse);
  }
}
