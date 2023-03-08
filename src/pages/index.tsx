import styles from "./index.module.css";
import { api } from "~/utils/api";
import React from 'react'
import { Avatar, Button } from "@mui/material";


function index() {
  const financeiro = api.financeiro
  const financeiroMutate = financeiro.createNew.useMutation()

  const getAll = financeiro.getAll.useQuery()

  return (
    <>
      <Button onClick={() => {
        financeiroMutate.mutate({
          vendedor: "abc",
          orcamento: 2323,
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
        })
      }} variant="contained">Contained</Button>
    </>
  )
}

export default index