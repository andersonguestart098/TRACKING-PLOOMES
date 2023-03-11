import { api } from "~/utils/api";
import React, { useState } from 'react'
import { ModelFinanceiro } from "@models/financeiro/financeiroSchema";
import { useFetch } from "@hooks/useFetch";
import { Button, CircularProgress } from "@mui/material";
import CustomTable from "@components/customtable"

function index() {
  const financeiroMutate = api.financeiro.createNew.useMutation()
  const [pagina, setPagina ] = useState(0)

  const { data, mutate, isLoading } = useFetch("/api/methodsdatabase/getall", pagina)


  if(isLoading) {
    return <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress disableShrink />
    </div>
  }

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
        
        const newData: ModelFinanceiro = {
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

        const updatedData = data.reverse()
        updatedData[updatedData.length] = newData
        updatedData.reverse()

        mutate(updatedData, false)
      }} variant="contained">Contained</Button>
      <CustomTable data={data} setPagina={setPagina} />
    </>
  )
}

export default index