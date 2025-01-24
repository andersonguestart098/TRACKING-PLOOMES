import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });

    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas métodos POST são autorizados' });
        return;
    }

    const { id, dado } = req.body;

    // Verifica se o `index` é "não definido" e ajusta o valor baseado em `dado.value`
    let index = dado.index;
    if (index === "não definido") {
        index = dado.value; // Ajusta para utilizar `dado.value` como `index` quando não estiver definido corretamente
    }

    // Checa se o ID e o novo index são válidos
    if (!id || !index) {
        res.status(400).send({ result: 'ID ou dados não fornecidos ou inválidos' });
        return;
    }

    try {
        switch (index) {
            case "expedicao":
                await handleMoveToExpedicao(id, dado.value, res);
                break;

            case "expedicao2":
                await handleMoveToExpedicao2(id, dado.value, res);
                break;

            case "logistica":
                await handleMoveToLogistica(id, dado.value, res);
                break;

            default:
                await handleUndefinedIndex(id, dado.value, res);
                break;
        }
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send({ error: "Erro ao processar a requisição." });
    }
}

async function handleUndefinedIndex(id: number, setor: string, res: NextApiResponse) {
    try {
        switch (setor) {
            case "expedicao":
                await prisma.passagemDados.update({
                    data: { expedicao: "expedicao" },
                    where: { id: Number(id) }
                });
                await prisma.expedicao.create({
                    data: {
                        statusNotaFiscal: "a definir",
                        responsavelNotaFiscal: "a definir",
                        author: { connect: { id: Number(id) } }
                    }
                });
                res.status(201).send({ result: "criado dado em expedicao" });
                break;

            case "expedicao2":
                await prisma.passagemDados.update({
                    data: { expedicao: "expedicao2" },
                    where: { id: Number(id) }
                });
                await prisma.expedicao2.create({
                    data: {
                        statusNotaFiscal: "a definir",
                        responsavelNotaFiscal: "a definir",
                        author: { connect: { id: Number(id) } }
                    }
                });
                res.status(201).send({ result: "criado dado em expedicao 2" });
                break;

            case "logistica":
                await prisma.passagemDados.update({
                    data: { expedicao: "logistica" },
                    where: { id: Number(id) }
                });
                await prisma.logistica.create({
                    data: {
                        statusNotaFiscal: "a definir",
                        responsavelNotaFiscal: "a definir",
                        author: { connect: { id: Number(id) } }
                    }
                });
                res.status(201).send({ result: "criado dado em logistica" });
                break;

            default:
                res.status(400).send({ result: "operação falhou" });
                break;
        }
    } catch (error) {
        console.error("Erro na criação de dados para setor:", error);
        res.status(500).send({ error: "Erro na criação de dados para setor." });
    }
}

async function handleMoveToExpedicao(id: number, novoSetor: string, res: NextApiResponse) {
    const expedicao = await prisma.passagemDados.findMany({
        include: { expedicaoPassagem: true },
        where: { id: Number(id) }
    });
    if (expedicao[0]?.expedicaoPassagem[0]?.id) {
        await prisma.expedicao.delete({
            where: { id: expedicao[0].expedicaoPassagem[0].id }
        });
    }
    await CreateWhere(novoSetor, id);
    res.status(200).send({ result: `movido de expedicao para ${novoSetor}` });
}

async function handleMoveToExpedicao2(id: number, novoSetor: string, res: NextApiResponse) {
    const expedicao2 = await prisma.passagemDados.findMany({
        include: { expedicao2Passagem: true },
        where: { id: Number(id) }
    });
    if (expedicao2[0]?.expedicao2Passagem[0]?.id) {
        await prisma.expedicao2.delete({
            where: { id: expedicao2[0].expedicao2Passagem[0].id }
        });
    }
    await CreateWhere(novoSetor, id);
    res.status(200).send({ result: `movido de expedicao2 para ${novoSetor}` });
}

async function handleMoveToLogistica(id: number, novoSetor: string, res: NextApiResponse) {
    const logistica = await prisma.passagemDados.findMany({
        include: { logisticaPassagem: true },
        where: { id: Number(id) }
    });
    if (logistica[0]?.logisticaPassagem[0]?.id) {
        await prisma.logistica.delete({
            where: { id: logistica[0].logisticaPassagem[0].id }
        });
    }
    await CreateWhere(novoSetor, id);
    res.status(200).send({ result: `movido de logistica para ${novoSetor}` });
}

async function CreateWhere(novoSetor: string, idCriacao: number) {
    await prisma.passagemDados.update({
        where: { id: Number(idCriacao) },
        data: { expedicao: novoSetor }
    });

    switch (novoSetor) {
        case "expedicao":
            await prisma.expedicao.create({
                data: {
                    responsavelNotaFiscal: "não definido",
                    statusNotaFiscal: "não definido",
                    author: { connect: { id: Number(idCriacao) } }
                }
            });
            break;

        case "expedicao2":
            await prisma.expedicao2.create({
                data: {
                    responsavelNotaFiscal: "não definido",
                    statusNotaFiscal: "não definido",
                    author: { connect: { id: Number(idCriacao) } }
                }
            });
            break;

        case "logistica":
            await prisma.logistica.create({
                data: {
                    responsavelNotaFiscal: "não definido",
                    statusNotaFiscal: "não definido",
                    author: { connect: { id: Number(idCriacao) } }
                }
            });
            break;
    }
}
