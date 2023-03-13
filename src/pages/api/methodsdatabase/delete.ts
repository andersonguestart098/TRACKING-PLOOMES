import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@utils/prismaInstance"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Apenas metodos POST são autorizados' })
        return
    }

    const { id } = req.body

    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({result: "Dados em falta"})
    }

    return res.status(200).send({
        result: await prisma.financeiro.delete({
            where: {
                id: Number(id)
            }
        })
    })
}