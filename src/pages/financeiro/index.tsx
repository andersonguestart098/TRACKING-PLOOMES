import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"
import { ModelFinanceiro } from '~/models/setoresInterface';
import CustomInput from '~/components/customInput';
import CustomSelect from '~/components/customSelect';

interface typeDB {
    result: ModelFinanceiro[]
    lengthDB: number
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if(!session) {
    return {
      redirect: {
        destination: "/",
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
  const { data: dataAuth } = useSession()
  const [pagina, setPagina ] = useState(0)

  const { data, isLoading } = useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro")



  if(isLoading) {
    return <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress disableShrink />
    </div>
  }

  return (
    <>
      <CustomNavBar setor="FINANCEIRO" setData={setPagina} dados={dataAuth} />
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Data|Hora</TableCell>
              <TableCell>Vendedor</TableCell>
              <TableCell>Orçamento</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Tipo|Faturamento</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Forma|Pagamento</TableCell>
              <TableCell>Parcelas</TableCell>
              <TableCell>Venda|Frete</TableCell>
              <TableCell>Retira|Entrega</TableCell>
              <TableCell>Frete|Conta</TableCell>
              <TableCell>Entrega|Cadastro</TableCell>
              <TableCell>Local|Cobrança</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Tipo|Frete</TableCell>
              <TableCell>Valor|Frete</TableCell>
              <TableCell>Data|Entrega</TableCell>
              <TableCell>Número|NF</TableCell>
              <TableCell>Status|NF</TableCell>
              <TableCell>Operador|NF</TableCell>
              <TableCell>Exped|Log</TableCell>
              <TableCell>Responsável|NF</TableCell>
              <TableCell>Observação</TableCell>
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelFinanceiro) => {
            return (
              <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.vendedor}</TableCell>
                  <TableCell>{item.orcamento}</TableCell>
                  <TableCell>
                  <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_cliente"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_tipoFaturamento"
                    />
                  </TableCell>
                  <TableCell>{item.valor}</TableCell>
                  <TableCell>{item.formaPagamento}</TableCell>
                  <TableCell>{item.parcelas}</TableCell>
                  <TableCell>
                    <CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_vendaFrete"
                      valor={item.vendaFrete}
                      />
                  </TableCell>
                  <TableCell>{item.retiraEntrega}</TableCell>
                  <TableCell>{item.freteConta}</TableCell>
                  <TableCell>{item.entregaCadastro ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.localCobranca}</TableCell>
                  <TableCell>{item.observacao}</TableCell>
                  <TableCell>{item.tipoFrete}</TableCell>
                  <TableCell>{item.valorFrete}</TableCell>
                  <TableCell>{item.dataEntrega}</TableCell>
                  <TableCell>{item.numeroNotaFiscal}</TableCell>
                  <TableCell>{item.operadorNotaFiscal}</TableCell>
                  <TableCell>{item.expedicaoLog}</TableCell>
                  <TableCell>{item.responsavelNotaFiscal}</TableCell>
                  <TableCell>{item.observacaoFinanceiro}</TableCell>
                  <TableCell>{item.vendedor}</TableCell>
                </TableRow>
            )
          })
      } paginacao={
        <Pagination onChange={(_, value) => { 
            value = value -1
            setPagina(value)
          }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/3)} />
      }/>
    </>
  )
}

export default index