interface Passagem {
  createdAt: string;
  id: number;
  notaFiscal: number;
  expedicao: string;
  updatedAt: string;
  cliente: string;
}

export interface ModelCruzamento {
  id?: string;
  expedicaoPassagem: ModelExpedicao[];
  expedicao2Passagem: ModelExpedicao2[];
  logisticaPassagem: ModelLogistica[];
  financeiroPassagem: ModelFinanceiro[];
}

export interface ModelAssinatura {
  id?: string;
  createdAt?: string;
  updatedAt?: Date | string;
  notaFiscal: number;
  responsavel: string;
  assinatura_img: string;
  setor: string;
}

export interface ModelFinanceiro {
  author?: Passagem;
  id?: string;
  setor?: string;
  cliente?: string;
  authorId?: string;
  createdAt?: string;
  bandeiraCartao: string;
  vendedor: string;
  orcamento: string;
  tipoFaturamento: string;
  valor: string;
  formaPagamento: string;
  parcelas: string;
  vendaFrete: boolean;
  retiraEntrega: string;
  freteConta: string;
  entregaCadastro: boolean;
  localCobranca: string;
  observacao: string;
  observacaoFinanceiro: string;
  tipoFrete: string;
  valorFrete: string;
  dataEntrega: string;
  statusNotaFiscal: string;
  operadorNotaFiscal: string;
  responsavelNotaFiscal: string;
  precisaEncomendar: string;
  descreva: string;
  precisaRecuperar: string;
  email: string;
  refreshToken: string;
}

export interface ModelExpedicao {
  author?: Passagem;
  id?: string;
  setor?: string;
  authorId?: string;
  createdAt?: string;
  responsavelNotaFiscal: string;
  statusNotaFiscal: string;
}

export interface ModelExpedicao2 {
  author?: Passagem;
  id?: string;
  setor?: string;
  authorId?: string;
  createdAt?: string;
  responsavelNotaFiscal: string;
  statusNotaFiscal: string;
}

export interface ModelLogistica {
  author?: Passagem;
  id?: string;
  setor?: string;
  authorId?: string;
  createdAt?: string;
  responsavelNotaFiscal: string;
  statusNotaFiscal: string;
}

export interface ModelSaida {
  id?: string;
  setor?: string;
  createdAt?: string;
  codigoEntrega: number;
  notaFiscal: number;
  nomeConferente: string;
  placa: string;
  motorista: string;
  cidadeDestino: string;
  hodometro: number;
  images: string;
  obs: string;
}

export interface ModelConfirmacaoEntrega {
  author?: Passagem;
  id?: string;
  setor?: string;
  authorId?: string;
  createdAt?: string;
  notaFiscal: number;
  motorista: string;
  cidade: string;
  entregaConcluida: string;
  obs: string;
  images: string;
}

export interface ModelRetorno {
  author?: Passagem;
  id?: string;
  setor?: string;
  authorId?: string;
  createdAt?: string;
  notaFiscal: number;
  placa: string;
  hodometro: number;
  data: string;
  obs: string;
}

export interface ModelCanhoto {
  author?: Passagem;
  authorId?: string;
  id?: string;
  setor?: string;
  createdAt?: string;
  notaFiscal: number;
  motorista: string;
  statusCanhoto: string;
  responsavelCanhoto: string;
}

export interface ModelCanhotoRetirado {
  author?: Passagem;
  authorId?: string;
  id?: string;
  setor?: string;
  createdAt?: string;
  notaFiscal: number;
  responsavel: string;
  motivo: string;
}

export interface ModelTeste {
  author?: Passagem;
  authorId?: string;
  id?: string;
  setor?: string;
  createdAt?: string;
  notaFiscal: number;
  teste: string;
}

export interface ModelOcorrencia {
  author?: Passagem;
  authorId?: string;
  id?: string;
  setor?: string;
  createdAt?: string;
  descricao: string;
  gravidade: string;
  responsavel: string;
  departamento: string;
  prioridade: string;
  status: string;
  causa: string;
  resolucao: string;
  gerouCusto: string;
  dataEncerramento: string;
  especifique: string;
  obs: string;
}

export interface ModelFeedBack {
  author?: Passagem;
  authorId?: string;
  id?: string;
  setor?: string;
  createdAt?: string;
  nome: string;
  avalie: string;
  nota: string;
  pontos: string;
  gostaria: string;
  obs: string;
}
