import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"
import { ModelCruzamento, ModelExpedicao2 } from '@models/setoresInterface';
import Loader from '@components/loader';
import CustomSelect_Widget from '@components/customSelect_widget';
import color from '~/config/colors';
import { motion } from 'framer-motion';
import ItemNaoEncontrado from '@components/itemNaoEncontrado';

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
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "cruzamento", searchString) :
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "cruzamento")

  console.log(data)

  //! LOADER DE CARREGAMENTO
  if(isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <CustomNavBar setor="CRUZAMENTO"
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
        {financeiroPassagem:{every:{cliente: {
            contains: valueInputChange
        }}}}
      ]]} />
      
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
            {value: "Emitida", visualValue: "Notas Emitida", color: "#38f269"},
            {value: "Pendente", visualValue: "Notas Pendente", color: "#f28538"},
            {value: "Cancelada", visualValue: "Notas Cancelada", color: "#d62013"},
            {value: "Retornou", visualValue: "Notas Retornou", color: "#d851f0"},
            {value: "Boleto em aberto", visualValue: "Notas Boleto em aberto", color: "#eb8c34"},
            {value: "Aguardando deposito", visualValue: "Notas Aguardando deposito", color: "#cc34eb"}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.financeiroPassagem = {}
            currentFilter.financeiroPassagem.every = {}
            currentFilter.financeiroPassagem.every.statusNotaFiscal = e.target.value
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
            currentFilter.expedicao = e.target.value
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
            currentFilter.financeiroPassagem = {}
            currentFilter.financeiroPassagem.every = {}

            currentFilter.financeiroPassagem.every.operadorNotaFiscal = e.target.value
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
            
            currentFilter.financeiroPassagem = {}
            currentFilter.financeiroPassagem.every = {}
            currentFilter.financeiroPassagem.every.responsavelNotaFiscal = e.target.value
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
    
    {data.result.length ?
    <CustomTable 
      childrenCabecarioTable={
        <TableRow>
          <TableCell>Id (Financeiro)</TableCell>
          <TableCell>Status (Expedicao)</TableCell>
          <TableCell>Status (Expedicao 2)</TableCell>
          <TableCell>Status (Logistica)</TableCell>
          <TableCell>Status (Financeiro)</TableCell>
        </TableRow>
      }
      childrenRowTable={
        data.result.map((item, index) => {
          return <TableRow 
            component={motion.div}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            key={index}>
            <TableCell>{item?.financeiroPassagem[0]?.id}</TableCell>
            <TableCell style={item?.expedicaoPassagem[0]?.statusNotaFiscal == undefined ? {background: "red"} : {}}>
              {item?.expedicaoPassagem[0]?.statusNotaFiscal ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

            <TableCell style={item?.expedicao2Passagem[0]?.statusNotaFiscal == undefined ? {background: "red"} : {}}
            >{item?.expedicao2Passagem[0]?.statusNotaFiscal ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>
            
            <TableCell style={item?.logisticaPassagem[0]?.statusNotaFiscal == undefined ? {background: "red"} : {}}
            >{item?.logisticaPassagem[0]?.statusNotaFiscal ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

            <TableCell style={
                    item?.financeiroPassagem[0]?.statusNotaFiscal == "Cancelada"? color.financeiro.cancelada : 
                    item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Emitida" ? color.financeiro.emitida :
                    item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Retornou" ? color.financeiro.retornou :
                    item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Boleto em aberto" ? color.financeiro.boletoAberto : 
                    item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Aguardando deposito" ? color.financeiro.aguardadoDeposito : 
                    item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Pendente" ? color.financeiro.pendente : {}
                  }>{item?.financeiroPassagem[0]?.statusNotaFiscal}</TableCell>
              
          </TableRow>
        }) 
      } paginacao={
        <Pagination onChange={(_, value) => { 
            value = value -1
            setPagina(value)
          }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/40)} />
      }/>
    : <ItemNaoEncontrado />}
    </>
  )
}

export default index