import { NextApiRequest, NextApiResponse } from "next";
import { findAllData } from "@controllers/findAllDataSetors";
import { findAllDataSearch } from "@controllers/findAllDataSearch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.body.stringSearch == ""){
        
        return await new findAllData().execute(req, res)
    }

    return await new findAllDataSearch().execute(req, res)
}