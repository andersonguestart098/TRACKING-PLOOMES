import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prismaInstance";

export class findAllDataSearch {
    async execute(req: NextApiRequest, res: NextApiResponse) {
        const data = await prisma.financeiro.findMany({
            include: {
                author: true
            },
            where: {
                author: {
                    notaFiscal: Number(req.body.stringSearch)
                }
            }
        })
        res.status(200).send({
            result: data
        })
    }
}