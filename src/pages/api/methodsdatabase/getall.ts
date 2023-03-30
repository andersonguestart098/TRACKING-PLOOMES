import { NextApiRequest, NextApiResponse } from "next";
import { findAllData } from "@controllers/findAllDataSetors";
import { findAllDataSearch } from "@controllers/findAllDataSearch";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

    if(req.body.stringSearch == ""){
        return await new findAllData().execute(req, res)
    }

    return await new findAllDataSearch().execute(req, res)
}