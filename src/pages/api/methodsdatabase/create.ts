import { NextApiRequest, NextApiResponse } from "next";
import { CanhotoController } from "@controllers/setores/canhoto";
import { FinanceiroController } from "@controllers/setores/financeiro";
import { SaidaController } from "@controllers/setores/saida";
import { confirmacaoEntregaController } from "@controllers/setores/confirmacaoEntrega";
import { retornoController } from "@controllers/setores/retorno";
import { assinaturaController } from "@controllers/setores/assinatura";
import { CanhotoRetiradoController } from "~/controllers/setores/canhotoRetirado";
import { FeedBackController } from "~/controllers/setores/feedBack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ result: "Apenas metodos POST são autorizados" });
    return;
  }

  const setor = req.body.setor;
  delete req.body.setor;

  switch (setor) {
    case "financeiro":
      await new FinanceiroController(req.body).execute();
      res.status(201).send({ result: "criado dado em financeiro" });
      break;

    case "canhoto":
      await new CanhotoController(req.body).execute();
      res.status(201).send({ result: "criado dado em canhoto" });
      break;

    case "canhotoRetirado":
      await new CanhotoRetiradoController(req.body).execute();
      res.status(201).send({ result: "criado dado em canhoto Retirado" });
      break;

    case "confirmacao entrega":
      await new confirmacaoEntregaController(req.body).execute();
      res.status(201).send({ result: "criado dado em confirmacão entrega" });
      break;

    case "saida":
      await new SaidaController(req.body).execute();
      res.status(201).send({ result: "criado dado em saida" });
      break;

    case "retorno":
      await new retornoController(req.body).execute();
      res.status(201).send({ result: "criado dado em retorno" });
      break;

    case "assinatura":
      await new assinaturaController(req.body).execute();
      res.status(201).send({ result: "criado dado em assinatura" });
      break;


    case "feedBack":
      await new FeedBackController(req.body).execute();
      res.status(201).send({ result: "criado dado em ocorrencia" });
      break;

    default:
      res
        .status(400)
        .send({ result: "Setor não reconhecido ou não informado" });
      break;
  }
}
