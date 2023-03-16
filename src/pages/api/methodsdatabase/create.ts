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
            res.status(201).send({result: (new FinanceiroController(req.body).execute())})
            break;
        
        default:
            res.status(400).send({result: "Setor não reconhecido ou nao informado"})
            break;
    }
}