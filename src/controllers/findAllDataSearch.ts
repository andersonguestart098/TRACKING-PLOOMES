import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prismaInstance";

export class findAllDataSearch {
    async execute(req: NextApiRequest, res: NextApiResponse) {
        const values = req.body.setor.split("#")
        
        let resultFilter = await prisma.financeiro.findMany({
            include: {
                author: true
            },
            where: {
                ...JSON.parse(req.body.stringSearch)
            }
        })
            
        res.status(200).send({result: resultFilter})
    }
}