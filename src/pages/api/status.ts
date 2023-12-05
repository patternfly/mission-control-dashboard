// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getStatus, Data } from "@/getters";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const owner = req.query.owner;

  if (typeof owner === "string" || !owner) {
    getStatus(owner)
      .then((output) => res.status(200).json(output))
      .catch((error) => res.status(400).json(error));
  } else {
    res.status(400).json({
      repos: ["ERROR"],
      statuses: {
        repo: {
          workflowStatus: "ERROR owner must be of type string if passed",
          syncStatus: "ERROR owner must be of type string if passed",
          bumpPRLink: "ERROR owner must be of type string if passed",
          upstreamOwnerLink: "ERROR owner must be of type string if passed",
        },
      },
    });
  }
}
