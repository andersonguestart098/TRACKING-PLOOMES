import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const prisma = new PrismaClient();

    let { pagina } = req.body
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