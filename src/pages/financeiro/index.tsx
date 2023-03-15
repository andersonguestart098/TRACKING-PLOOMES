import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { CircularProgress } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"

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

  const { data, isLoading } = useFetch("/api/methodsdatabase/getall", pagina)


  if(isLoading) {
    return <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress disableShrink />
    </div>
  }

  return (
    <>
      <CustomNavBar setData={setPagina} dados={dataAuth} />
      <CustomTable data={data} setPagina={setPagina} />
    </>
  )
}

export default index