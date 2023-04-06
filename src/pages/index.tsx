import React from 'react'
import { ModelFinanceiro } from "@models/setoresInterface";
import { Button } from "@mui/material";
import { createDataController } from '~/services/prisma/createData';
import { databaseRepository } from '~/repositories/mutateData';
import { getSession, signIn, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx)

  if(session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false
      }
    }
  }

  return {
    props:{
      session
    }
  }
}

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
      <Button onClick={() => signIn('github')}>
        LOGIN
      </Button>
      <Button onClick={() => signOut()}>Sair</Button>
    </>
  )
}

export default index