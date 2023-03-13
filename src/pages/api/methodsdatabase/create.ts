import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@utils/prismaInstance"
import {ModelFinanceiro} from "@models/financeiro/financeiroSchema"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
        return
    }


}