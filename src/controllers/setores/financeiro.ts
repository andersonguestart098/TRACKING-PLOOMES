import prisma from "@utils/prismaInstance";
import { ModelFinanceiro } from "~/models/setoresInterface";

export class FinanceiroController {
    constructor(
        private data: ModelFinanceiro
    ){}

    async execute() {
        await prisma.financeiro.create({
            data: {
                dataEntrega: this.data.dataEntrega,
                entregaCadastro: this.data.entregaCadastro,
                formaPagamento: this.data.formaPagamento,
                freteConta: this.data.freteConta,
                localCobranca: this.data.localCobranca,
                observacao: this.data.observacao,
                observacaoFinanceiro: this.data.observacaoFinanceiro,
                operadorNotaFiscal: this.data.operadorNotaFiscal,
                orcamento: Number(this.data.orcamento),
                parcelas: this.data.parcelas,
                responsavelNotaFiscal: this.data.responsavelNotaFiscal,
                retiraEntrega: this.data.retiraEntrega,
                statusNotaFiscal: this.data.statusNotaFiscal,
                tipoFaturamento: this.data.tipoFaturamento,
                tipoFrete: this.data.tipoFrete,
                valor: this.data.valor,
                valorFrete: this.data.valorFrete,
                vendaFrete: this.data.vendaFrete,
                vendedor: this.data.vendedor,
                bandeiraCartao: this.data.bandeiraCartao,
                author: {
                    create: {
                        expedicao: "ainda não definido",
                        cliente: this!.data!.cliente ?? ""
                    }
                    
                }
            }
        })
    }
}