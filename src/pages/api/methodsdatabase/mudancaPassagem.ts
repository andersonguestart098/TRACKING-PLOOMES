import { NextApiRequest, NextApiResponse } from "next"
import prisma from "~/utils/prismaInstance"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
        return
    }

    console.log(req.body)
    const { id, dado } = req.body

    switch (dado.index) {
        case "ainda não definido":
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
                    res.status(201).send({ result: await prisma.expedicao.create({
                        data: {
                            notaFiscal: 123,
                            responsavelNf: "a definir",
                            statusNf: "a definir",
                            author: {
                                connect: {
                                    id: Number(id)
                                }
                            }
                        }
                    })
                })
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
                        res.status(201).send({ result: await prisma.expedicao2.create({
                            data: {
                                notaFiscal: 123,
                                responsavelNf: "a definir",
                                statusNf: "a definir",
                                author: {
                                    connect: {
                                        id: Number(id)
                                    }
                                }
                            }
                        })
                    })
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
                    res.status(201).send({ result: await prisma.logistica.create({
                        data: {
                            notaFiscal: 123,
                            responsavelNf: "a definir",
                            statusNf: "a definir",
                            author: {
                                connect: {
                                    id: Number(id)
                                }
                            }
                        }
                    })
                })
                break;
                    
                default:
                    res.status(400).send({result: "operação falhou"})
                    break;
            }
            break;
        default:
            switch(dado.index) {
                case "expedicao":
                    const data = await prisma.passagemDados.findFirst({
                    include: {
                        expedicaoPassagem: true
                    }
                    })
                    await CreateWhere(dado.value, data!.id)
                    await prisma.expedicao.delete({
                        where: {
                            id: data!.expedicaoPassagem[0]!.id
                        }    
                    })
                    res.status(200).send({ result: "OK"})
                break

                case "expedicao2":
                    const data1 = await prisma.passagemDados.findFirst({
                    include: {
                        expedicao2Passagem: true
                    }
                    })
                    await CreateWhere(dado.value, data1!.id)
                    await prisma.expedicao2.delete({
                        where: {
                            id: data1!.expedicao2Passagem[0]!.id
                        }    
                    })
                    res.status(200).send({ result: "OK"})
                break

                case "logistica":
                    const data2 = await prisma.passagemDados.findFirst({
                    include: {
                        logisticaPassagem: true
                    }
                    })
                    await CreateWhere(dado.value, data2!.id)
                    await prisma.logistica.delete({
                        where: {
                            id: data2!.logisticaPassagem[0]!.id
                        }    
                    })
                    res.status(200).send({ result: "OK"})
                break

            }
            break;
    }
}


async function CreateWhere(novoSetor: string, id: number) {
    switch (novoSetor) {
        case "expedicao":
            await prisma.expedicao.create({
                data: {
                    notaFiscal: 0,
                    responsavelNf: "não definido",
                    statusNf: "não definido",
                    author: {
                        connect: {
                            id: Number(id)
                        }
                    }
                }
            })
            break;

        case "expedicao2":
            await prisma.expedicao2.create({
                data: {
                    notaFiscal: 0,
                    responsavelNf: "não definido",
                    statusNf: "não definido",
                    author: {
                        connect: {
                            id: Number(id)
                        }
                    }
                }
            })
            break;

        case "logistica":
            await prisma.logistica.create({
                data: {
                    notaFiscal: 0,
                    responsavelNf: "não definido",
                    statusNf: "não definido",
                    author: {
                        connect: {
                            id: Number(id)
                        }
                    }
                }
            })
            break;
    }
}

//mudancaPassagem