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
import Loader from '~/components/loader';
import { motion } from 'framer-motion';
import CustomSelect_Widget from '~/components/customSelect_widget';
import color from '~/config/colors';

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
  const [imgGigante, setImgGigante] = useState("")

  const [travarAuto, setTravarAuto ] = useState(false)
  const [searchString, setSearchString ] = useState("{}")

  //! VALOR PADRAO DE FILTRO DE PESQUISA (VALOR DO DB)
  const [filterInput, setFilterInput ] = useState('notaFiscalP')
  
  const [valueInputChange, setValueInputChange ] = useState('')

  React.useEffect(() => {
    if(searchString == "{}") {
      setTravarAuto(false)
    }
  }, [searchString])

  const { data, isLoading } = travarAuto ?
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "assinatura", searchString) :
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "assinatura")


   //! LOADER DE CARREGAMENTO
   if(isLoading) {
    return (
      <Loader />
    )
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
        {/* //! BARRA DE PESQUISA */}
      <CustomNavBar setor="ASSINATURAS"
      setSearchString={setSearchString}
      setValueInputChange={setValueInputChange}
      searchString={searchString}
      filter={filterInput}
      setSearch={setTravarAuto}
      dados={dataAuth} 
      filterData={[["dataCriacao", "cliente"],[
        {
          updatedAt: {
            gte: new Date(valueInputChange)
          }
        },
        {cliente: {
            contains: valueInputChange
        }}
      ]]} 
      />
      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{textAlign: "center"}}>
        <p>Filtrar ao digitar: </p>
        <div>
          <Chip onClick={() => {
            setFilterInput("notaFiscalP")
          }} sx={filterInput == "notaFiscalP" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Numero de Nota Fiscal"  variant="outlined" />
          
          <Chip onClick={() => { 
            setFilterInput("cliente")
          }} sx={filterInput == "cliente" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Cliente"  variant="outlined" />

          <Chip onClick={() => { 
            setFilterInput("dataCriacao")
          }} sx={filterInput == "dataCriacao" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Data"  variant="outlined" />
        </div>
        <p>Filtro rapido: </p>
        <div style={{display: "flex", justifyContent: "space-between", marginLeft: 15, marginRight: 15}}>
          <CustomSelect_Widget 
          itens={[
            {value: "Emitida", visualValue: "Notas Emitida", color: color.financeiro.emitida.background},
            {value: "Pendente", visualValue: "Notas Pendente", color: color.financeiro.pendente.background},
            {value: "Cancelada", visualValue: "Notas Cancelada", color: color.financeiro.cancelada.background},
            {value: "Retornou", visualValue: "Notas Retornou", color: color.financeiro.retornou.background},
            {value: "Boleto em aberto", visualValue: "Notas Boleto em aberto", color: color.financeiro.boletoAberto.background},
            {value: "Aguardando deposito", visualValue: "Notas Aguardando deposito", color: color.financeiro.aguardadoDeposito.background}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.statusNotaFiscal = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Status Nota Fiscal'}          
          />
          <CustomSelect_Widget 
          itens={[
            {value: "expedicao", visualValue: "Expedicao"},
            {value: "expedicao2", visualValue: "Expedicao 2"},
            {value: "logistica", visualValue: "Logistica"}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.author = {}
            currentFilter.author.expedicao = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Expedicões'}          
          />
          <CustomSelect_Widget 
          itens={[
            {value: "Rosi", visualValue: "Rosi"},
            {value: "Aprendiz", visualValue: "Aprendiz"},
            {value: "Julia", visualValue: "Julia"},
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.operadorNotaFiscal = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Operador Nota Fiscal'}          
          />
          <CustomSelect_Widget 
          itens={[
            {value: "Max", visualValue: "Max"},
            {value: "Eduardo", visualValue: "Eduardo"},
            {value: "Cristiano S.", visualValue: "Cristiano S."},
            {value: "Manoel", visualValue: "Manoel"},
            {value: "Cristinao D.", visualValue: "Cristinao D."}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.responsavelNotaFiscal = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Responsavel Nota Fiscal'}          
          />
        </div>
        <Chip onClick={() => { 
            setSearchString("{}")
          }} sx={{marginTop: 2}} label="Tirar Todos Filtros" variant="outlined" />
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
              component={motion.div}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.responsavel}</TableCell>
                  <TableCell>{item.notaFiscal}</TableCell>
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