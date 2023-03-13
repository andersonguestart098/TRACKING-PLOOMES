import React, { useState } from 'react'
import { ModelFinanceiro } from "@models/financeiro/financeiroSchema";
import { useFetch } from "@hooks/useFetch";
import { Button, CircularProgress } from "@mui/material";
import CustomTable from "@components/customtable"

function index() {
  const [pagina, setPagina ] = useState(0)

  const { data, mutate, isLoading } = useFetch("/api/methodsdatabase/getall", pagina)


  if(isLoading) {
    return <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress disableShrink />
    </div>
  }

  return (
    <>
      <CustomTable data={data} setPagina={setPagina} />
    </>
  )
}

export default index