import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelAssinatura } from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';

import { Button, Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

interface typeDB {
    result: ModelAssinatura[]
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
  const [imgGigante, setImgGigante ] = useState("")

  const [travarAuto, setTravarAuto ] = useState(false)
  const [searchString, setSearchString ] = useState("{}")
  const [filter, setFilter ] = useState(['notaFiscal'])
  const [filterInput, setFilterInput ] = useState('notaFiscal')

  React.useEffect(() => {
    if(searchString == "") {
      setTravarAuto(false)
    }
  }, [searchString])

  const { data, isLoading } = travarAuto ? 
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "assinatura", searchString) :
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "assinatura")


  if(isLoading) {
    return <div style={{display: "flex", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  }

  return (
    <>
        {imgGigante.length ? <div style={{
            zIndex: 5,
            position: "absolute",
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            background: "#00000080",
            width: "100vw",
            height: "100vh"
        }}>
            <img src={imgGigante} />
            <Button sx={{
                position: "absolute",
                right: 10,
                top: 10
            }} color="error" onClick={() => setImgGigante("")} variant='contained'>X</Button>
        </div> : <></>}
        <CustomNavBar setor="ASSINATURA" 
          setSearchString={setSearchString} 
          searchString={searchString}
          filter={filterInput}
          setSearch={setTravarAuto} dados={dataAuth} />
      <div style={{textAlign: "center"}}>
        <p>Filtrar ao digitar: </p>
        <div>
          <Chip onClick={() => {
            setFilterInput("notaFiscal")
          }} sx={filterInput == "notaFiscal" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Numero de Nota Fiscal"  variant="outlined" />
          
          <Chip onClick={() => { 
            setFilterInput("cliente")
          }} sx={filterInput == "cliente" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Cliente"  variant="outlined" />

          <Chip onClick={() => { 
            setFilterInput("dataCriacao")
          }} sx={filterInput == "dataCriacao" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Data"  variant="outlined" />
        </div>
        <p>Filtro rapido: </p>
        <div>
        <Chip onClick={() => {
            let filterCurrent: string[] = filter
            filterCurrent.push("notaEmitida")
            setFilter(filterCurrent)
            let currentFilter = JSON.parse(searchString)
            currentFilter.statusNotaFiscal = "Emitida"
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }} sx={filter.includes("notaEmitida") ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Nota Emitida"  variant="outlined" />

          <Chip onClick={() => {
            let filterCurrent: string[] = filter
            filterCurrent.push("notaPendente")
            setFilter(filterCurrent)
            let currentFilter = JSON.parse(searchString)
            currentFilter.statusNotaFiscal = "Pendente"
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }} sx={filter.includes("notaPendente") ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Nota Pendente"  variant="outlined" />
        </div>
      </div>
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Reponsavel</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Assinatura</TableCell>
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelAssinatura) => {
            return (
              <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.responsavel}</TableCell>
                  <TableCell>{item.cliente}</TableCell>
                  <TableCell><img onClick={() => setImgGigante(item.assinatura_img)} src={item.assinatura_img} width={30} /></TableCell>
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