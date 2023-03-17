import { NextApiRequest, NextApiResponse } from "next";
import { findAllData } from "@controllers/findAllDataSetors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return await new findAllData().execute(req, res)
}