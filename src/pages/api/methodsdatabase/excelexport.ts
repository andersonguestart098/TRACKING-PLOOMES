import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import prisma from "~/utils/prismaInstance";
const ExcelJS = require('exceljs');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    })
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema Semear';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;

    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ];
    let financeiro = workbook.addWorksheet("Financeiro");
    const dataFinanceiro = await prisma.financeiro.findMany({
      include: {
        author: true
      }
    })


    financeiro.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Vendedor', key: 'vendedor', width: 22},
      {header: 'Orçamento', key: 'orcamento', width: 22},
      {header: 'Cliente', key: 'cliente', width: 22},
      {header: 'Tipo Faturamento', key: 'tipoFaturamento', width: 22},
      {header: 'Valor', key: 'valor', width: 22},
      {header: 'Forma de pagamento', key: 'formaPagamento', width: 22},
      {header: 'Parcelas', key: 'parcelas', width: 22},
      {header: 'Venda Frete', key: 'vendaFrete', width: 22},
      {header: 'Retira/Entrega', key: 'retiraEntrega', width: 22},
      {header: 'Frete/Conta', key: 'freteConta', width: 22},
      {header: 'Entrega/Cadastro', key: 'entregaCadastro', width: 22},
      {header: 'Local/Cobrança', key: 'localCobranca', width: 22},
      {header: 'Observações', key: 'observacao', width: 22},
      {header: 'Tipo/Frete', key: 'tipoFrete', width: 22},
      {header: 'Valor/Frete', key: 'valorFrete', width: 22},
      {header: 'Data/Entrega', key: 'dataEntrega', width: 22},
      {header: 'Número NF', key: 'notaFiscal', width: 22},
      {header: 'Status/NF', key: 'statusNotaFiscal', width: 22},
      {header: 'Operador/NF', key: 'operadorNotaFiscal', width: 22},
      {header: 'Exped/Log', key: 'expedicao', width: 22},
      {header: 'Responsável/NF', key: 'responsavelNotaFiscal', width: 22},
      {header: 'Observações Financeiro', key: 'observacaoFinanceiro', width: 22},
    ];
    
    dataFinanceiro.map((item,index) => {
      financeiro.addRow({
        id: item.id,
        data: item.createdAt,
        vendedor: item.vendedor, 
        orcamento: item.orcamento, 
        cliente: item.author.cliente, 
        tipoFaturamento: item.tipoFaturamento,
        valor: item.valor == "" ? "Não Definido" : item.valor,
        parcelas: item.parcelas == "" ? "Não Definido" : item.parcelas,
        vendaFrete: item.vendaFrete,
        retiraEntrega: item.retiraEntrega,
        freteConta: item.freteConta,
        entregaCadastro: item.entregaCadastro,
        localCobranca: item.localCobranca,
        observacao: item.observacao,
        tipoFrete: item.tipoFrete,
        valorFrete: item.valorFrete,
        dataEntrega: item.dataEntrega,
        notaFiscal: item.author.notaFiscal,
        statusNf: item.statusNotaFiscal,
        operadorNotaFiscal: item.operadorNotaFiscal,
        expedicao: item.author.expedicao,
        responsavelNotaFiscal: item.responsavelNotaFiscal,
        observacaoFinanceiro: item.observacaoFinanceiro,
        
      });
    })

    let expedicao = workbook.addWorksheet("Expedicao");
    const dataExpedicao = await prisma.expedicao.findMany({
      include: {
        author: true
      }
    })


    expedicao.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Numero NF', key: 'numeroNf', width: 22},
      {header: 'Responsavel NF', key: 'responsavelNf', width: 32},
      {header: 'Status NF', key: 'statusNf', width: 22},
    ];
    
    dataExpedicao.map((item,index) => {
      expedicao.addRow({
        id: item.id,
        data: item.createdAt,
        numeroNf: item.author.notaFiscal,
        responsavelNf: item.responsavelNotaFiscal,
        statusNf: item.statusNotaFiscal,
      });
    })

    let expedicao2 = workbook.addWorksheet("Expedicao 2");
    const dataExpedicao2 = await prisma.expedicao2.findMany({
      include: {
        author: true
      }
    })


    expedicao2.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Numero NF', key: 'numeroNf', width: 22},
      {header: 'Responsavel NF', key: 'responsavelNf', width: 32},
      {header: 'Status NF', key: 'statusNf', width: 22},
    ];
    
    dataExpedicao2.map((item,index) => {
      expedicao2.addRow({
        id: item.id,
        data: item.createdAt,
        numeroNf: item.author.notaFiscal,
        responsavelNf: item.responsavelNotaFiscal,
        statusNf: item.statusNotaFiscal,
      });
    })

    let logistica = workbook.addWorksheet("Logistica");
    const datalogistica = await prisma.logistica.findMany({
      include: {
        author: true
      }
    })


    logistica.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Numero NF', key: 'numeroNf', width: 22},
      {header: 'Responsavel NF', key: 'responsavelNf', width: 32},
      {header: 'Status NF', key: 'statusNf', width: 22},
    ];
    
    datalogistica.map((item,index) => {
      logistica.addRow({
        id: item.id,
        data: item.createdAt,
        numeroNf: item.author.notaFiscal,
        responsavelNf: item.responsavelNotaFiscal,
        statusNf: item.statusNotaFiscal,
      });
    })

    let saida = workbook.addWorksheet("Saida");
    const datasaida = await prisma.saida.findMany({})


    saida.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Código Entrega', key: 'codigoEntrega', width: 22},
      {header: 'Número NF', key: 'notaFiscal', width: 32},
      {header: 'Conferente', key: 'conferente', width: 22},
      {header: 'Placa', key: 'placa', width: 22},
      {header: 'Motorista', key: 'motorista', width: 22},
      {header: 'Cidade', key: 'cidadeDestino', width: 22},
      {header: 'Hodometro', key: 'hodometro', width: 22},
      {header: 'Hodometro', key: 'dataHoraSaida', width: 22},
      {header: 'Observação', key: 'obs', width: 22},
    ];
    
    datasaida.map((item,index) => {
      saida.addRow({
        id: item.id,
        data: item.createdAt,
        codigoEntrega: item.codigoEntrega,
        numeroNf: item.notaFiscal,
        conferente: item.nomeConferente,
        placa: item.placa,
        motorista: item.motorista,
        cidadeDestino: item.cidadeDestino,
        hodometro: item.hodometro,
        obs: item.obs,
      });
    })

    let confirmacaoEntrega = workbook.addWorksheet("Confirmação Entrega");
    const dataconfirmacaoEntrega = await prisma.confirmacaoEntrega.findMany({})


    confirmacaoEntrega.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Motorista', key: 'motorista', width: 22},
      {header: 'Número NF', key: 'notaFiscal', width: 32},
      {header: 'Cidade', key: 'cidade', width: 22},
      {header: 'Entrega Conluida', key: 'entregaConcluida', width: 22},
      {header: 'Observação', key: 'obs', width: 22},
    ];
    
    dataconfirmacaoEntrega.map((item,index) => {
      confirmacaoEntrega.addRow({
        id: item.id,
        data: item.createdAt,
        motorista: item.motorista,
        notaFiscal: item.notaFiscal,
        cidade: item.cidade,
        entregaConcluida: item.entregaConcluida,
        obs: item.obs,
      });
    })

    let retorno = workbook.addWorksheet("Retorno");
    const dataretorno = await prisma.retorno.findMany({})


    retorno.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Placa', key: 'placa', width: 22},
      {header: 'Hodometro', key: 'hodometro', width: 32},
      {header: 'Data', key: 'data', width: 22},
      {header: 'Observação', key: 'obs', width: 22},
    ];
    
    dataretorno.map((item,index) => {
      confirmacaoEntrega.addRow({
        id: item.id,
        data: item.createdAt,
        placa: item.placa,
        hodometro: item.hodometro,
        dataRetorno: item.data,
        obs: item.obs,
      });
    })

    let canhoto = workbook.addWorksheet("Canhoto");
    const datacanhoto = await prisma.canhoto.findMany({})


    canhoto.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Motorista', key: 'motorista', width: 22},
      {header: 'Status Canhoto', key: 'statusCanhoto', width: 32},
      {header: 'Nota Fiscal', key: 'notaFiscal', width: 22},
      {header: 'Responsável Canhoto', key: 'responsavelCanhoto', width: 22},
    ];
    
    datacanhoto.map((item,index) => {
      canhoto.addRow({
        id: item.id,
        data: item.createdAt,
        motorista: item.motorista,
        statusCanhoto: item.statusCanhoto,
        notaFiscal: item.notaFiscal,
        responsavelCanhoto: item.responsavelCanhoto,
      });
    })



    let assinatura= workbook.addWorksheet("Assinatura");
    const dataassinatura = await prisma.assinatura.findMany({})


    assinatura.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Data Criação', key: 'data', width: 22},
      {header: 'Responsavel', key: 'responsavel', width: 32},
      {header: 'Numero NF', key: 'numeroNf', width: 22},
      {header: 'Assinatura', key: 'assinado', width: 12},
    ];
    
    dataassinatura.map((item,index) => {
      assinatura.addRow({
        id: item.id,
        data: item.createdAt,
        responsavel: item.responsavel,
        numeroNf: item.notaFiscal,
        assinado: !item.assinatura_img.length ? "Não assinado" : "Assinado"
      });
    })


    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "CemearDadosTabelas.xlsx");
    workbook.xlsx.write(res)
      .then(function(data: any) {
        res.end();
        console.log('File write done........');
      }); //*/
}