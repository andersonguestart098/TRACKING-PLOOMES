interface Passagem {
    createdAt: string,
    id: number,
    notaFiscal: number,
    updatedAt: string,
}

export interface ModelFinanceiro {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    vendedor: string 
    orcamento: string 
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