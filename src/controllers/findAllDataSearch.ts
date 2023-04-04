import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prismaInstance";

export class findAllDataSearch {
    async execute(req: NextApiRequest, res: NextApiResponse) {
        let resultFilter

        switch (req.body.setor) {
            case "financeiro":
                resultFilter = await prisma.financeiro.findMany({
                    include: {
                        author: true
                    },
                    where: {
                        ...JSON.parse(req.body.stringSearch)
                    }
                })
                break;
            case "cruzamento":
                resultFilter = await prisma.passagemDados.findMany({
                    include: {
                        expedicao2Passagem: true,
                        expedicaoPassagem: true,
                        financeiroPassagem: true,
                        logisticaPassagem: true,
                    },
                    where: {
                        ...JSON.parse(req.body.stringSearch)
                    }
                })
            break
        
            default:
                res.status(400).send({result: "Setor não informado"})
                break;
        }
            
        res.status(200).send({result: resultFilter})
    }
}