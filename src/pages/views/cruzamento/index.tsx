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
  const [travarAuto, setTravarAuto ] = useState(0)

  const { data, isLoading } = useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro")



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
              <TableCell>Id</TableCell>

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