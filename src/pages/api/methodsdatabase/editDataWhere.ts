import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prismaInstance";
import NextCors from "nextjs-cors";


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

    const {id, dado} = req.body

    if(req.body.setor == "home") {
        await prisma.user.update({
            where: {
                email: req!.body!.email
            },
            data: {
                setor: req!.body!.setorEditar
            }
        })
        return res.status(200).send({result: "Bem-Vindo"})
    }

    console.log(req.body)
    if(dado.index == "notaFiscal") {
        if(req.body.setor == "financeiro" || req.body.setor == "expedicao" || 
           req.body.setor == "expedicao2" || req.body.setor == "logistica") {
            await prisma.passagemDados.update({
                data: {
                    notaFiscal: Number(dado.value)
                },
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
        }else {
            switch (req.body.setor) {        
                case "saida":
                    await prisma.saida.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            notaFiscal: Number(dado.value)
                        }
                    })
                    return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
                break;
        
                case "canhoto":
                    await prisma.canhoto.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            notaFiscal: Number(dado.value)
                        }
                    })
                    return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
                break;
            }
        }
    }

    if(!req.body) {
        return res.status(400).send({ result: "Tudo em falta" })  
    }else if (!id.length) {
        return res.status(400).send({ result: "ID em falta" })  
    }else if (Object.keys(dado).length === 0) {
        return res.status(400).send({ result: "DADOS em falta" })  
    }

    
    switch (req.body.setor) {
        case "financeiro":
            await prisma.financeiro.update({
                where: {
                    id: Number(id)
                },
                data: {
                    [dado.index]: dado.value
                }
            })
            return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
        break;

        case "expedicao":
            await prisma.expedicao.update({
                where: {
                    id: Number(id)
                },
                data: {
                    [dado.index]: dado.value
                }
            })
            return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
        break;

        case "expedicao2":
            await prisma.expedicao2.update({
                where: {
                    id: Number(id)
                },
                data: {
                    [dado.index]: dado.value
                }
            })
            return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
        break;
        case "logistica":
            await prisma.logistica.update({
                where: {
                    id: Number(id)
                },
                data: {
                    [dado.index]: dado.value
                }
            })
            return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
        break;

        case "saida":
            if(dado.index == "hodometro") {
                await prisma.saida.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        hodometro: Number(dado.value)
                    }
                })
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
            }else {
                await prisma.saida.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        [dado.index]: dado.value
                    }
                })
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
            }
        break;

        case "canhoto":
            await prisma.canhoto.update({
                where: {
                    id: Number(id)
                },
                data: {
                    [dado.index]: dado.value
                }
            })
            return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
        break;
    
        default:
        break;
    }
    
}