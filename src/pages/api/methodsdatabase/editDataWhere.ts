import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const prisma = new PrismaClient();

    const {id, dado} = req.body
    return  res.status(201).send({ result: await prisma.financeiro.update({
            where: {
                id: Number(id)
            },
            data: {
                [dado.index]: dado.value
            }
        })
    })
}