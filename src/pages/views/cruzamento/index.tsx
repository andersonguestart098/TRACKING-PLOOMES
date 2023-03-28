import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"
import { ModelCruzamento, ModelExpedicao2 } from '@models/setoresInterface';
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';

interface typeDB {
    result: ModelCruzamento[]
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
  const [travarAuto, setTravarAuto ] = useState(0)

  const { data, isLoading } = useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "cruzamento")



  if(isLoading) {
    return <div style={{display: "flex", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  }

  return (
    <>
      <CustomNavBar setor="CRUZAMENTO" setData={setPagina} dados={dataAuth} />
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id (Expedicao)</TableCell>
              <TableCell>Responsavel Nota Fiscal (Expedicao)</TableCell>
              <TableCell>Status Nota Fiscal (Expedicao)</TableCell>
              <TableCell>Id (Expedicao 2)</TableCell>
              <TableCell>Responsavel Nota Fiscal (Expedicao 2)</TableCell>
              <TableCell>Status Nota Fiscal (Expedicao 2)</TableCell>
              <TableCell>Id (Logistica)</TableCell>
              <TableCell>Responsavel Nota Fiscal (Logistica)</TableCell>
              <TableCell>Status Nota Fiscal (Logistica)</TableCell>
        </TableRow>
      }
      childrenRowTable={
        <TableRow>
        {data.result[0]?.expedicaoPassagem.map((item: ModelExpedicao2) => {
          return (
            <>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.responsavelNotaFiscal}</TableCell>
              <TableCell>{item.statusNotaFiscal}</TableCell>
            </>
            )
          })
          }
        {data.result[1]?.expedicao2Passagem.map((item: ModelExpedicao2) => {
          return (
            <>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.responsavelNotaFiscal}</TableCell>
              <TableCell>{item.statusNotaFiscal}</TableCell>
            </>
            )
          })
          }
          {data.result[2]?.logisticaPassagem.map((item: ModelExpedicao2) => {
          return (
            <>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.responsavelNotaFiscal}</TableCell>
              <TableCell>{item.statusNotaFiscal}</TableCell>
            </>
            )
          })
          }
        </TableRow>
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