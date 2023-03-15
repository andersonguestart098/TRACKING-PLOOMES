import prisma from "@utils/prismaInstance";

interface ModelFinanceiro {
    vendedor: string 
    orcamento: number 
    cliente: string 
    tipoFaturamento: string 
    valor: string 
    formaPagamento: string 
    parcelas: string 
    vendaFrete: boolean 
    retiraEntrega: string 
    freteConta: string 
    entregaCadastro: boolean 
    localCobranca: string 
    observacao: string 
    observacaoFinanceiro: string 
    tipoFrete: string 
    valorFrete: string 
    dataEntrega: string 
    numeroNotaFiscal: number 
    statusNotaFiscal: string 
    operadorNotaFiscal: string 
    expedicaoLog: string 
    responsavelNotaFiscal: string 
}

export class FinanceiroController {
    constructor(
        private data: ModelFinanceiro
    ){}

    async execute() {
        this.data.orcamento = Number(this.data.orcamento)
        this.data.numeroNotaFiscal = Number(this.data.numeroNotaFiscal)
        await prisma.financeiro.create({
            data: {
                ...this.data,
                author: {
                    create: {
                        notaFiscal: 123123
                    }
                }
            }
        })
    }
}