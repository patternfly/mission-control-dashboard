// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getBumpPR } from "@/getters";

type Data = {
  number: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const repoName = req.query.repo;

  if (typeof repoName === "string") {
    const PRNumber = await getBumpPR(repoName);
    res.status(200).json({ number: PRNumber });
  } else {
    res.status(400).json({ number: 0 });
  }
}
