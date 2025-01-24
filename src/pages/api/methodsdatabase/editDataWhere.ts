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
        return res.status(405).send({ result: 'Apenas métodos POST são autorizados' });
    }

    const { id, dado, setor } = req.body;

    // Verifique se todos os parâmetros necessários estão presentes e se o ID é válido
    if (!id || isNaN(Number(id)) || !dado || !setor) {
        return res.status(400).send({ result: "ID, dado ou setor não fornecido ou inválido." });
    }

    if (!dado.index || !dado.value) {
        return res.status(400).send({ result: "Dado index ou valor não fornecido." });
    }

    try {
        // Caso específico para o setor "home"
        if (setor === "home") {
            await prisma.user.update({
                where: {
                    email: req.body.email,
                },
                data: {
                    setor: req.body.setorEditar,
                },
            });
            return res.status(200).send({ result: "Bem-Vindo" });
        }

        console.log("Dados Recebidos:", req.body);

        // Lógica específica para "notaFiscal"
        if (dado.index === "notaFiscal") {
            if (["financeiro", "expedicao", "expedicao2", "logistica"].includes(setor)) {
                await prisma.passagemDados.update({
                    data: { notaFiscal: Number(dado.value) },
                    where: { id: Number(id) },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });
            } else {
                switch (setor) {
                    case "saida":
                        await prisma.saida.update({
                            where: { id: Number(id) },
                            data: { notaFiscal: Number(dado.value) },
                        });
                        return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

                    case "canhoto":
                        await prisma.canhoto.update({
                            where: { id: Number(id) },
                            data: { notaFiscal: Number(dado.value) },
                        });
                        return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

                    case "ocorrencia":
                        await prisma.ocorrencia.update({
                            where: { id: Number(id) },
                            data: { [dado.index]: dado.value },
                        });
                        return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });
                }
            }
        }

        // Logica para outros tipos de `dado.index` e `setor`
        switch (setor) {
            case "financeiro":
                await prisma.financeiro.update({
                    where: { id: Number(id) },
                    data: { [dado.index]: dado.value },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            case "expedicao":
                await prisma.expedicao.update({
                    where: { id: Number(id) },
                    data: { [dado.index]: dado.value },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            case "expedicao2":
                await prisma.expedicao2.update({
                    where: { id: Number(id) },
                    data: { [dado.index]: dado.value },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            case "logistica":
                await prisma.logistica.update({
                    where: { id: Number(id) },
                    data: { [dado.index]: dado.value },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            case "saida":
                const updateData = dado.index === "hodometro" ? { hodometro: Number(dado.value) } : { [dado.index]: dado.value };
                await prisma.saida.update({
                    where: { id: Number(id) },
                    data: updateData,
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            case "canhoto":
                await prisma.canhoto.update({
                    where: { id: Number(id) },
                    data: { [dado.index]: dado.value },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            case "ocorrencia":
                await prisma.ocorrencia.update({
                    where: { id: Number(id) },
                    data: { [dado.index]: dado.value },
                });
                return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}` });

            default:
                return res.status(400).send({ result: "Setor não reconhecido." });
        }
    } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        return res.status(500).send({ result: "Erro ao processar a atualização." });
    }
}
