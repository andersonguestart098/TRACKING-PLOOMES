interface Passagem {
    createdAt: string,
    id: number,
    notaFiscal: number,
    expedicao: string,
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

export interface ModelExpedicao {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    numeroNotaFiscal: number
    responsavelNotaFiscal: string 
    statusNotaFiscal: string 
    
}

export interface ModelExpedicao2 {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    numeroNotaFiscal: number
    responsavelNotaFiscal: string 
    statusNotaFiscal: string 
    
}

export interface ModelLogistica {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    responsavelNf: number
    responsavelNotaFiscal: string 
    statusNf: string 
    
}

export interface ModelSaida {
    author?: Passagem
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    codigoEntrega: number
    numeroNotaFiscal: number 
    nomeConferente: string
    placa: string
    motorista: string
    cidadesDestino: string
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
    motorista: string
    codigoEntrega: number 
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
    id?: string
    setor?: string
    authorId?: string
    createdAt?: string
    numeroNotaFiscal: number
    motorista: string
    statusCanhoto: string 
    responsavelCanhoto: number
    
}