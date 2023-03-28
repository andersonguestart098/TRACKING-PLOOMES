import { NextApiRequest, NextApiResponse } from "next"
import { CanhotoController } from "@controllers/setores/canhoto"
import { FinanceiroController } from "@controllers/setores/financeiro"
import { SaidaController } from "@controllers/setores/saida"
import { confirmacaoEntregaController } from "@controllers/confirmacaoEntrega"


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

        case "canhoto":
            await new CanhotoController(req.body).execute()
            res.status(201).send({result: "criado dado em canhoto"})
        break;

        case "confirmacao entrega":
            await new confirmacaoEntregaController(req.body).execute()
            res.status(201).send({result: "criado dado em confirmacão entrega"})
        break;

        case "saida":
            await new SaidaController(req.body).execute()
            res.status(201).send({result: "criado dado em saida"})
        break;
        
        default:
            res.status(400).send({result: "Setor não reconhecido ou não informado"})
        break;
    }
}