// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getWorkflowResult } from "@/getters";

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const PRNumber = parseInt(req.query.number);
  const repoName = req.query.repo;
  const owner = req.query.owner;

  if (typeof repoName === "string" && (typeof owner === 'string' || !owner)) {
    const status = await getWorkflowResult(PRNumber, repoName, owner);
    res.status(200).json({ status });
  } else {
    res.status(400).json({ status: "ERROR" });
  }
}
