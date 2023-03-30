import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
        return
    }

    const { id, dado } = req.body

    if(dado.index == "ainda não definido") {
        switch (dado.value) {
            case "expedicao":
                await prisma.passagemDados.update({
                    data: {
                        expedicao: "expedicao"
                    },
                    where: {
                        id: Number(id)
                    }
                })
                await prisma.expedicao.create({
                    data: {
                        statusNotaFiscal: "a definir",
                        responsavelNotaFiscal: "a definir",

                        author: {
                            connect: {
                                id: Number(id)
                            }
                        }
                    }
                })
                res.status(201).send({ result: "criado dado em expedicao"})
            break;
            
            case "expedicao2":
                    await prisma.passagemDados.update({
                        data: {
                            expedicao: "expedicao2"
                        },
                        where: {
                            id: Number(id)
                        }
                    })
                    await prisma.expedicao2.create({
                        data: {

                            responsavelNotaFiscal: "a definir",
                            statusNotaFiscal: "a definir",
                            author: {
                                connect: {
                                    id: Number(id)
                                }
                            }
                        }
                    })
                    res.status(201).send({ result: "criado dado em expedicao 2"})
            break;
            
            case "logistica":
                await prisma.passagemDados.update({
                    data: {
                        expedicao: "logistica"
                    },
                    where: {
                        id: Number(id)
                    }
                })
                await prisma.logistica.create({
                    data: {

                        responsavelNotaFiscal: "a definir",
                        statusNotaFiscal: "a definir",
                        author: {
                            connect: {
                                id: Number(id)
                            }
                        }
                    }
                })
                res.status(201).send({ result: "criado dado em logistica"})
            break;
                
            default:
                res.status(400).send({result: "operação falhou"})
            break;
        }
    }

    if(dado.index == "expedicao"){
        const expedicao = await prisma.passagemDados.findMany({
            include: {
                expedicaoPassagem: true
            },
            where: {
                id: Number(id)
            }
        })
        console.log(expedicao[0]?.expedicaoPassagem[0]?.id)
        await prisma.expedicao.delete({
            where: {
                id: expedicao[0]?.expedicaoPassagem[0]?.id
            }
        })
        await CreateWhere(dado.value, id)
        res.status(200).send({result: `movido de expedicao para ${dado.value}`})
    } else if(dado.index == "expedicao2"){
        const expedicao2 = await prisma.passagemDados.findMany({
            include: {
                expedicao2Passagem: true
            },
            where: {
                id: Number(id)
            }
        })
        console.log(expedicao2[0]?.expedicao2Passagem[0]?.id)
        await prisma.expedicao2.delete({
            where: {
                id: expedicao2[0]?.expedicao2Passagem[0]?.id
            }
        })
        await CreateWhere(dado.value, id)
        res.status(200).send({result: `movido de expedicao2 para ${dado.value}`})
    } else if(dado.index == "logistica"){
        const logistica = await prisma.passagemDados.findMany({
            include: {
                logisticaPassagem: true
            },
            where: {
                id: Number(id)
            }
        })
        console.log(logistica[0]?.logisticaPassagem[0]?.id)
        await prisma.logistica.delete({
            where: {
                id: logistica[0]?.logisticaPassagem[0]?.id
            }
        })
        await CreateWhere(dado.value, id)
        res.status(200).send({result: `movido de logistica para ${dado.value}`})
    }  


async function CreateWhere(novoSetor=dado.value, idCriacao: number) {
    await prisma.passagemDados.update({
        where: {
            id: Number(id)
        },
        data: {
            expedicao: dado.value
        }
    })
    switch (novoSetor) {
        case "expedicao":
            await prisma.expedicao.create({
                data: {

                    responsavelNotaFiscal: "não definido",
                    statusNotaFiscal: "não definido",
                    author: {
                        connect: {
                            id: Number(idCriacao)
                        }
                    }
                }
            })
            break;

        case "expedicao2":
            await prisma.expedicao2.create({
                data: {

                    responsavelNotaFiscal: "não definido",
                    statusNotaFiscal: "não definido",
                    author: {
                        connect: {
                            id: Number(idCriacao)
                        }
                    }
                }
            })
            break;

        case "logistica":
            await prisma.logistica.create({
                data: {

                    responsavelNotaFiscal: "não definido",
                    statusNotaFiscal: "não definido",
                    author: {
                        connect: {
                            id: Number(idCriacao)
                        }
                    }
                }
            })
            break;
    }
}

}