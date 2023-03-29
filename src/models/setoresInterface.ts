interface Passagem {
    createdAt: string,
    id: number,
    notaFiscal: number,
    expedicao: string,
    updatedAt: string,
}

export interface ModelCruzamento {
    id?: string
    expedicaoPassagem: ModelExpedicao[],
    expedicao2Passagem: ModelExpedicao2[],
    logisticaPassagem: ModelLogistica[],
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
    statusNotaFiscal: string 
    operadorNotaFiscal: string 
    responsavelNotaFiscal: string 
}

export interface ModelExpedicao {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    responsavelNotaFiscal: string 
    statusNotaFiscal: string 
    
}

export interface ModelExpedicao2 {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    responsavelNotaFiscal: string 
    statusNotaFiscal: string 
    
}

export interface ModelLogistica {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    responsavelNotaFiscal: string 
    statusNotaFiscal: string 
    
}

export interface ModelSaida {
    id?: string
    setor?: string
    createdAt?: string
    codigoEntrega: number
    notaFiscal: number 
    nomeConferente: string
    placa: string
    motorista: string
    cidadeDestino: string
    hodometro: number
    dataHoraSaida: string
    obs: string
    
}

export interface ModelConfirmacaoEntrega {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    notaFiscal: number
    motorista: string
    cidade: string
    entregaConcluida: string
    obs: string
    
}

export interface ModelRetorno {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    codigoEntrega: number
    placa: string 
    hodometro: number
    data: string
    obs: string
    
}

export interface ModelCanhoto {
    author?: Passagem
    authorId?: string
    id?: string
    setor?: string
    createdAt?: string
    numeroNotaFiscal: number
    motorista: string
    statusCanhoto: string
    responsavelCanhoto: string
}