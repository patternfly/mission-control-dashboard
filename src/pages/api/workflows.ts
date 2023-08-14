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
  const PRNumber = req.query.number;
  const repoName = req.query.repo;
  const owner = req.query.owner;

  if (
    typeof repoName === "string" &&
    (typeof owner === "string" || !owner) &&
    typeof PRNumber === "string"
  ) {
    const status = await getWorkflowResult(parseInt(PRNumber), repoName, owner);
    res.status(200).json({ status });
  } else {
    res.status(400).json({ status: "ERROR" });
  }
}
