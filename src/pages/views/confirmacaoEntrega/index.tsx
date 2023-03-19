import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelConfirmacaoEntrega} from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';

import { CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

interface typeDB {
    result: ModelConfirmacaoEntrega[]
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

  const { data, isLoading } = useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "confirmacaoEntrega")



  if(isLoading) {
    return <div style={{display: "flex", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  }

  return (
    <>
      <CustomNavBar setor="CONFIRMAÇÃO DE ENTREGA" setData={setPagina} dados={dataAuth} />
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Data|Hora</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Cód|Entrega</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Entrega|Concluída</TableCell>
              <TableCell>Observação</TableCell>
              
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelConfirmacaoEntrega) => {
            return (
              <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.motorista}</TableCell>
                  <TableCell>{item.codigoEntrega}</TableCell>
                  <TableCell>{item.cidade}</TableCell>
                  <TableCell>{item.entregaConcluida}</TableCell>
                  <TableCell>{item.obs}</TableCell>

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