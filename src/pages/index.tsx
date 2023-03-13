import React from 'react'
import { ModelFinanceiro } from "@models/financeiro/financeiroSchema";
import { Button } from "@mui/material";
import CustomTable from "@components/customtable"
import { createDataController } from '~/services/prisma/createData';
import { databaseRepository } from '~/repositories/mutateData';

function index() {

  return (
    <>
      <Button onClick={() => {
        const newData: ModelFinanceiro = {
          vendedor: "abc",
          orcamento: "2323",
          cliente: "abc",
          tipoFaturamento: "abc",
          valor: "abc",
          formaPagamento: "abc",
          parcelas: "abc",
          vendaFrete: false,
          retiraEntrega: "abc",
          freteConta: "abc",
          entregaCadastro: false,
          localCobranca: "abc",
          observacao: "abc",
          observacaoFinanceiro: "abc",
          tipoFrete: "abc",
          valorFrete: "abc",
          dataEntrega: "abc",
          numeroNotaFiscal: 123,
          statusNotaFiscal: "abc",
          operadorNotaFiscal: "abc",
          expedicaoLog: "abc",
          responsavelNotaFiscal: "abc"
        }

        return new createDataController(
          new databaseRepository
        ).execute(
          "/api/methodsdatabase/create", 
          newData,
          "financeiro"
        )

      }} variant="contained">Contained</Button>
    </>
  )
}

export default index

/**
 * const newData: ModelFinanceiro = {
          id: "pendente",
          createdAt: "pendente",
          authorId: "pendente",
          vendedor: "abc",
          orcamento: "2323",
          cliente: "abc",
          tipoFaturamento: "abc",
          valor: "abc",
          formaPagamento: "abc",
          parcelas: "abc",
          vendaFrete: false,
          retiraEntrega: "abc",
          freteConta: "abc",
          entregaCadastro: false,
          localCobranca: "abc",
          observacao: "abc",
          observacaoFinanceiro: "abc",
          tipoFrete: "abc",
          valorFrete: "abc",
          dataEntrega: "abc",
          numeroNotaFiscal: 123,
          statusNotaFiscal: "abc",
          operadorNotaFiscal: "abc",
          expedicaoLog: "abc",
          responsavelNotaFiscal: "abc"
        }
 */