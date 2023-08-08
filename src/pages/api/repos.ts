// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRepos } from "@/getters";

type Data = {
  names: string[];
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const owner = req.query.owner;

  if (typeof owner === "string" || !owner) {
    res.status(200).json({ names: await getRepos(owner) });
  } else {
    res.status(400).json({ names: ["owner param must be of type string"] });
  }
}
