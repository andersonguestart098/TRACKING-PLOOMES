import prisma from "@utils/prismaInstance";
import { NextApiRequest, NextApiResponse } from "next";
import requestApi from "~/services/requestApi";
import { imageSuporteSetor } from "~/utils/imageSuporteSetor";

export class findAllData {
  async execute(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      res.status(405).send({ result: "Apenas metodos POST são autorizados" });
      return;
    }

    const { pagina, setor } = req.body;
    let operator: any;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ result: "pagina em falta" });
    }

    switch (setor) {
      case "financeiro":
        operator = prisma.financeiro;
        break;

      case "expedicao":
        operator = prisma.expedicao;
        break;

      case "expedicao2":
        operator = prisma.expedicao2;
        break;

      case "logistica":
        operator = prisma.logistica;
        break;

      case "saida":
        let result = await prisma.saida.findMany({
          take: 40,
          skip: pagina == 0 ? 0 : pagina * 40,
          orderBy: {
            id: "desc",
          },
        });
        const imgSaida = await imageSuporteSetor(result, "saida");

        return res.status(200).json({
          result: [result, imgSaida],
          lengthDB: (await prisma.saida.findMany()).length,
        });
        break;

      case "assinatura":
        return res.status(200).json({
          result: await prisma.assinatura.findMany({
            take: 40,
            skip: pagina == 0 ? 0 : pagina * 40,
            orderBy: {
              id: "desc",
            },
          }),
          lengthDB: (await prisma.assinatura.findMany()).length,
        });
        break;

      case "confirmacaoEntrega":
        let resultConf = await prisma.confirmacaoEntrega.findMany({
          take: 40,
          skip: pagina == 0 ? 0 : pagina * 40,
          orderBy: {
            id: "desc",
          },
        });

        const imgConfirmacao = await imageSuporteSetor(
          resultConf,
          "confirmacaoEntrega"
        );

        return res.status(200).json({
          result: [resultConf, imgConfirmacao],
          lengthDB: (await prisma.confirmacaoEntrega.findMany()).length,
        });
        break;

      case "retorno":
        return res.status(200).json({
          result: await prisma.retorno.findMany({
            take: 40,
            skip: pagina == 0 ? 0 : pagina * 40,
            orderBy: {
              id: "desc",
            },
          }),
          lengthDB: (await prisma.retorno.findMany()).length,
        });
        break;

      case "canhoto":
        return await res.status(200).json({
          result: await prisma.canhoto.findMany({
            take: 40,
            skip: pagina == 0 ? 0 : pagina * 40,
            orderBy: {
              id: "desc",
            },
          }),
          lengthDB: (await prisma.canhoto.findMany()).length,
        });
        break;

      case "canhotoRetirado":
        return await res.status(200).json({
          result: await prisma.canhotoRetirado.findMany({
            take: 40,
            skip: pagina == 0 ? 0 : pagina * 40,
            orderBy: {
              id: "desc",
            },
          }),
          lengthDB: (await prisma.canhotoRetirado.findMany()).length,
        });
        break;


      case "ocorrencia":
        return await res.status(200).json({
          result: await prisma.ocorrencia.findMany({
            take: 40,
            skip: pagina == 0 ? 0 : pagina * 40,
            orderBy: {
              id: "desc",
            },
          }),
          lengthDB: (await prisma.ocorrencia.findMany()).length,
        });
        break;

      case "feedBack":
        return await res.status(200).json({
          result: await prisma.feedBack.findMany({
            take: 40,
            skip: pagina == 0 ? 0 : pagina * 40,
            orderBy: {
              id: "desc",
            },
          }),
          lengthDB: (await prisma.feedBack.findMany()).length,
        });
        break;

      case "cruzamento":
        let dataTotalCanhoto: any[] = [];
        let dataTotalConfirmacao: any[] = [];
        let data = await prisma.passagemDados.findMany({
          include: {
            financeiroPassagem: true,
            expedicaoPassagem: true,
            expedicao2Passagem: true,
            logisticaPassagem: true,
          },
          take: 40,
          skip: pagina == 0 ? 0 : pagina * 40,
          orderBy: {
            id: "desc",
          },
        });

        for (let prop in data) {
          let dataCanhoto: any = [];
          let dataCorfirmacaoEntrega: any = [];

          let verificacao: any = [];
          data[prop]?.financeiroPassagem.map((item) => {
            if (item.statusNotaFiscal == "Retornou") {
              verificacao[prop] = false;
            } else if (item.statusNotaFiscal == "Cancelada") {
              verificacao[prop] = false;
            } else if (item.statusNotaFiscal == "Boleto em aberto") {
              verificacao[prop] = false;
            } else if (item.statusNotaFiscal == "Aguardando deposito") {
              verificacao[prop] = false;
            } else if (item.statusNotaFiscal == "Em analise") {
              verificacao[prop] = false;
            } else if (item.statusNotaFiscal == "Pendente") {
              verificacao[prop] = false;
            } else {
              verificacao[prop] = true;
            }
          });

          if (verificacao?.[prop]) {
            dataCanhoto = await prisma.canhoto.findFirst({
              where: {
                notaFiscal: data[prop]?.notaFiscal ?? 0,
              },
            });
            dataCorfirmacaoEntrega = await prisma.confirmacaoEntrega.findFirst({
              where: {
                notaFiscal: data[prop]?.notaFiscal ?? 0,
              },
            });
          }

          dataTotalCanhoto.push(dataCanhoto ?? {});
          dataTotalConfirmacao.push(dataCorfirmacaoEntrega ?? {});
        }

        return await res.status(200).json({
          result: data,
          nonFlux: [dataTotalCanhoto, dataTotalConfirmacao],
          lengthDB: (await prisma.passagemDados.findMany()).length,
        });
        break;

      case "home":
        const dataAuth = await JSON.parse(req.body.stringSearch);
        const dataAuthDB = await prisma.user.findUnique({
          where: {
            email: dataAuth.user.email,
          },
        });

        if (dataAuthDB?.setor == null) {
          return res.status(200).send({ result: "não definido" });
        }

        switch (dataAuthDB?.setor) {
          case "adm":
            return await res.status(200).send({
              result: [
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Pendente",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Emitida",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Retornou",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Cancelada",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Em analise",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Boleto em aberto",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Aguardando deposito",
                    },
                  })
                ).length,
                (await prisma.financeiro.findMany()).length,
              ],

              setor: "adm",
            });
            break;

          case "logistica":
            return await res.status(200).send({
              result: [
                (
                  await prisma.logistica.findMany({
                    where: {
                      statusNotaFiscal: "Pendente",
                    },
                  })
                ).length,
                (
                  await prisma.logistica.findMany({
                    where: {
                      statusNotaFiscal: "Emitida",
                    },
                  })
                ).length,
                (await prisma.logistica.findMany()).length,
              ],
              setor: "logistica",
            });
            break;

          case "financeiro":
            return await res.status(200).send({
              result: [
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Pendente",
                    },
                  })
                ).length,
                (
                  await prisma.financeiro.findMany({
                    where: {
                      statusNotaFiscal: "Emitida",
                    },
                  })
                ).length,
                (await prisma.financeiro.findMany()).length,
              ],
              setor: "financeiro",
            });
            break;

          case "expedicao":
            return await res.status(200).send({
              result: [
                (
                  await prisma.expedicao.findMany({
                    where: {
                      statusNotaFiscal: "Pendente",
                    },
                  })
                ).length,
                (
                  await prisma.expedicao.findMany({
                    where: {
                      statusNotaFiscal: "Emitida",
                    },
                  })
                ).length,
                (await prisma.expedicao.findMany()).length,
              ],
              setor: "expedicao",
            });
            break;

          case "expedicao2":
            return await res.status(200).send({
              result: [
                (
                  await prisma.expedicao2.findMany({
                    where: {
                      statusNotaFiscal: "Pendente",
                    },
                  })
                ).length,
                (
                  await prisma.expedicao2.findMany({
                    where: {
                      statusNotaFiscal: "Emitida",
                    },
                  })
                ).length,
                (await prisma.expedicao2.findMany()).length,
              ],
              setor: "expedicao2",
            });
            break;

          case "confirmacaoEntrega":
            return await res.status(200).send({
              result: [
                //? PENDENTE
                (
                  await prisma.confirmacaoEntrega.findMany({
                    where: {
                      entregaConcluida: "Não",
                    },
                  })
                ).length,
                //? EMITIDA
                (
                  await prisma.confirmacaoEntrega.findMany({
                    where: {
                      entregaConcluida: "Sim",
                    },
                  })
                ).length,
                //? TOTAL
                (
                  await prisma.confirmacaoEntrega.findMany()
                ).length,
              ],
              setor: "confirmacaoEntrega",
            });
            break;

          case "canhoto":
            return await res.status(200).send({
              result: [
                (
                  await prisma.canhoto.findMany({
                    where: {
                      statusCanhoto: "Pendente",
                    },
                  })
                ).length,
                (
                  await prisma.canhoto.findMany({
                    where: {
                      statusCanhoto: "Concluido",
                    },
                  })
                ).length,
                (await prisma.canhoto.findMany()).length,
              ],
              setor: "canhoto",
            });
            break;

          case "saida":
            return await res.status(200).send({
              result: ["N/D", "N/D", (await prisma.saida.findMany()).length],
              setor: "Saida",
            });
            break;

          case "retorno":
            return await res.status(200).send({
              result: ["N/D", "N/D", (await prisma.retorno.findMany()).length],
              setor: "retorno",
            });
            break;

          case "canhotoRetirado":
            return await res.status(200).send({
              result: [
                "N/D",
                "N/D",
                (await prisma.canhotoRetirado.findMany()).length,
              ],
              setor: "canhotoRetirado",
            });
            break;

        

          case "ocorrencia":
            return await res.status(200).send({
              result: [
                "N/D",
                "N/D",
                (await prisma.ocorrencia.findMany()).length,
              ],
              setor: "ocorrencia",
            });
            break;

          case "feedBack":
            return await res.status(200).send({
              result: ["N/D", "N/D", (await prisma.feedBack.findMany()).length],
              setor: "ocorrencia",
            });
            break;
        }
        break;
      default:
        return await res.status(400).send({ result: "setor em falta" });
        break;
    }

    res.status(200).json({
      result: await operator.findMany({
        include: {
          author: true,
        },
        take: 40,
        skip: pagina == 0 ? 0 : pagina * 40,
        orderBy: {
          id: "desc",
        },
      }),
      lengthDB: (await operator.findMany()).length,
    });
  }
}
