import prisma from "@utils/prismaInstance";
import { NextApiRequest, NextApiResponse } from "next";

export class findAllData {

    async execute(req: NextApiRequest ,res: NextApiResponse) {
        if (req.method !== 'POST') {
            res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
            return
        }
    
        const { pagina, setor } = req.body
        let operator: any
    
        switch (setor) {
            case "financeiro":
                operator = prisma.financeiro
                break;
    
            case "expedicao":
                operator = prisma.expedicao
                break;

            case "expedicao2":
                operator = prisma.expedicao2
                break;

            case "logistica":
                operator = prisma.logistica
                break;

            case "saida":
                operator = prisma.saida
                break;

            case "confirmacaoEntrega":
                operator = prisma.confirmacaoEntrega
                break;

            case "retorno":
                operator = prisma.retorno
                break;

            case "canhoto":
                operator = prisma.canhoto
                break;
            
            default:
                res.status(400).send({result: "setor em falta"})
                break;
        }
    
            if(Object.keys(req.body).length === 0) {
                return res.status(400).send({result: "pagina em falta"})
            }
        
            res.status(200).json({ 
            result: await operator.findMany({
                include: {
                    author: true
                },
                take: 3,
                skip: pagina == 0 ? 0 : pagina * 3,
                orderBy: {
                    id: "desc"
                }
            }),
            lengthDB: ((await operator.findMany()).length)
        })
    }
}