// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { closeBumpPR } from "@/setters";

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const repoName = req.query.repo;
  const owner = req.query.owner;

  if (typeof repoName !== "string" || typeof owner === "object") {
    res.status(400).json({ response: `ERROR: Invalid arguments` });
    return;
  }

  if (req.method === "POST") {
    const closeResponse = await closeBumpPR(repoName, owner);
    res.status(200).json({ response: closeResponse });
  }
}
