// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSyncStatus } from "@/getters";
import { syncRepo } from "@/setters";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const repoName = req.query.repo;
  const branch = req.query.branch;
  const owner = req.query.owner;

  if (req.method === "GET") {
    const syncStatus = await getSyncStatus(repoName, branch, owner);
    res.status(200).json(syncStatus);
  } else if (req.method === "POST") {
    const syncResponse = await syncRepo(repoName, owner);
    res.status(200).json(syncResponse);
  }
}
