import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prismaInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
        return
    }

    let { pagina } = req.body

    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({result: "pagina em falta"})
    }

    res.status(200).json({ 
    result: await prisma.financeiro.findMany({
        take: 3,
        skip: pagina == 0 ? 0 : pagina * 3,
        orderBy: {
            id: "desc"
        }
    }),
    lengthDB: (await prisma.financeiro.findMany()).length
})
}