import { z } from "zod";
import { schemaFinanceiro } from "@models/financeiro/financeiroSchema_zod"

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const financeiro = createTRPCRouter({

  createNew: publicProcedure
    .input(z.object({
      vendedor: z.string(),
      orcamento: z.number(),
      cliente: z.string(),
      tipoFaturamento: z.string(),
      valor: z.string(),
      formaPagamento: z.string(),
      parcelas: z.string(),
      vendaFrete: z.boolean(),
      retiraEntrega: z.string(),
      freteConta: z.string(),
      entregaCadastro: z.boolean(),
      localCobranca: z.string(),
      observacao: z.string(),
      observacaoFinanceiro: z.string(),
      tipoFrete: z.string(),
      valorFrete: z.string(),
      dataEntrega: z.string(),
      numeroNotaFiscal: z.number(),
      statusNotaFiscal: z.string(),
      operadorNotaFiscal: z.string(),
      expedicaoLog: z.string(),
      responsavelNotaFiscal: z.string()
  }))
    .mutation(({ input, ctx }) => {
      try {
        return ctx.prisma.financeiro.create({
          data: input
        })
      } catch (e) {
        console.log(e)
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.financeiro.findMany();
  }),

  deleteWhere: publicProcedure
    .input(z.string())
    .query(({ input, ctx}) => {
      return ctx.prisma.financeiro.delete({
        where: {
          id: input
        }
      })
    }),

  findWhereId: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.example.findMany({
        where: {
          id: input
        }
      })
    })
});
