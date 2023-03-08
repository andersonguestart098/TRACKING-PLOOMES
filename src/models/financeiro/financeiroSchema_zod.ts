import { z } from "zod";

export class schemaFinanceiro {
    private static instance: schemaFinanceiro;
    private constructor() { }

    public static getInstance(): schemaFinanceiro {
        if (!schemaFinanceiro.instance) {
            schemaFinanceiro.instance = new schemaFinanceiro();
        }

        return schemaFinanceiro.instance;
    }

    public execute(): any { 
        return z.object({
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
        })
    }
}