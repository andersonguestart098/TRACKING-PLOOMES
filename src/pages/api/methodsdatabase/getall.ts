import { NextApiRequest, NextApiResponse } from "next";
import { findAllData } from "@controllers/findAllDataSetors";
import { findAllDataSearch } from "@controllers/findAllDataSearch";
import NextCors from "nextjs-cors";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.body.stringSearch == "" || req.body.setor == "home") {
    return await new findAllData().execute(req, res);
  }
  console.log(req.body.stringSearch);
  return await new findAllDataSearch().execute(req, res);
}
