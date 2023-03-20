import { NextApiRequest, NextApiResponse } from "next"
import { FinanceiroController } from "~/controllers/setores/financeiro"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
        return
    }

    const { setor } = req.body
    delete req.body.setor

    switch (setor) {
        case "financeiro":
            await new FinanceiroController(req.body).execute()
            res.status(201).send({result: "criado dado em financeiro"})
            break;
        
        default:
            res.status(400).send({result: "Setor não reconhecido ou nao informado"})
            break;
    }
}