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

        if(Object.keys(req.body).length === 0) {
            return res.status(400).send({result: "pagina em falta"})
        }
    
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
                return res.status(200).json({ 
                    result: await prisma.saida.findMany({
                        take: 40,
                        skip: pagina == 0 ? 0 : pagina * 40,
                        orderBy: {
                            id: "desc"
                        }
                    }),
                    lengthDB: ((await prisma.saida.findMany()).length)
                })
                break;

                case "assinatura":
                    return res.status(200).json({ 
                        result: await prisma.assinatura.findMany({
                            take: 40,
                            skip: pagina == 0 ? 0 : pagina * 40,
                            orderBy: {
                                id: "desc"
                            }
                        }),
                        lengthDB: ((await prisma.assinatura.findMany()).length)
                    })
                    break;

            case "confirmacaoEntrega":
                return res.status(200).json({ 
                    result: await prisma.confirmacaoEntrega.findMany({
                        take: 40,
                        skip: pagina == 0 ? 0 : pagina * 40,
                        orderBy: {
                            id: "desc"
                        }
                    }),
                    lengthDB: ((await prisma.confirmacaoEntrega.findMany()).length)
                })
                break;

            case "retorno":
                return res.status(200).json({ 
                    result: await prisma.retorno.findMany({
                        take: 40,
                        skip: pagina == 0 ? 0 : pagina * 40,
                        orderBy: {
                            id: "desc"
                        }
                    }),
                    lengthDB: ((await prisma.retorno.findMany()).length)
                })
                break;

            case "canhoto":
                return await res.status(200).json({ 
                    result: await prisma.canhoto.findMany({
                        take: 40,
                        skip: pagina == 0 ? 0 : pagina * 40,
                        orderBy: {
                            id: "desc"
                        }
                    }),
                    lengthDB: ((await prisma.canhoto.findMany()).length)
                })
                break;

            case "cruzamento": 
                return await res.status(200).json({ 
                    result: await prisma.passagemDados.findMany({
                        include: {
                            financeiroPassagem: true,
                            expedicaoPassagem: true,
                            expedicao2Passagem: true,
                            logisticaPassagem: true
                        },
                        take: 40,
                        skip: pagina == 0 ? 0 : pagina * 40,
                        orderBy: {
                            id: "desc"
                        }
                    }),
                    lengthDB: ((await prisma.passagemDados.findMany()).length)
                })
                break;

            case "home": 
                const notasPendentes = await prisma.expedicao.findMany({
                    where: {
                        statusNotaFiscal: "Pendente"
                    }
                })
                const notasEmitidas = await prisma.expedicao.findMany({
                    where: {
                        statusNotaFiscal: "Emitida"
                    }
                })
                const notasTotais = await prisma.expedicao.findMany()

                return await res.status(200).send({result: [notasPendentes.length, notasEmitidas.length, notasTotais.length]})
                break;
            
            default:
                return await res.status(400).send({result: "setor em falta"})
                break;
        }
        
            res.status(200).json({ 
            result: await operator.findMany({
                include: {
                    author: true
                },
                take: 40,
                skip: pagina == 0 ? 0 : pagina * 40,
                orderBy: {
                    id: "desc"
                }
            }),
            lengthDB: ((await operator.findMany()).length)
        })
    }
}