import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelLogistica } from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';

import { CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

interface typeDB {
    result: ModelLogistica[]
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

  const { data, isLoading } = useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "logistica")



  if(isLoading) {
    return <div style={{display: "flex", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  }

  return (
    <>
      <CustomNavBar setor="LOGISTICA" setData={setPagina} dados={dataAuth} />
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Data|Hora</TableCell>
              <TableCell>Número|NF</TableCell>
              <TableCell>Responsável|NF</TableCell>
              <TableCell>Status|NF</TableCell>
              
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelLogistica) => {
            return (
              <TableRow
                  key={item.id}
                  style={
                    item.statusNotaFiscal ==  "Alexandre" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Dionathan" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Douglas" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Igon" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Juliano" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Matheus" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Paulo Alexandre" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Vanderlei" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Vilnei" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Max" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Cristiano" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "William" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Cancelada" ? {background: "#d62013"} : 
                    item.statusNotaFiscal ==  "Aguardando rota" ? {background: "#d851f0"} :
                    item.statusNotaFiscal ==  "a definir" ? {background: "#eb8c34"} : 
                    item.statusNotaFiscal ==  "Aguardando vendedor" ? {background: "#cc34eb"} : 
                    item.statusNotaFiscal ==  "" ? {background: "#f28538"} : {}
                  }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.author?.notaFiscal}</TableCell>
                  <TableCell>{item.responsavelNotaFiscal}</TableCell>
                  <TableCell>{item.statusNotaFiscal}</TableCell>

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