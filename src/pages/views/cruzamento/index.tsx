import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"
import { ModelCanhoto, ModelConfirmacaoEntrega, ModelCruzamento, ModelExpedicao2 } from '@models/setoresInterface';
import Loader from '@components/loader';
import CustomSelect_Widget from '@components/customSelect_widget';
import color from '~/config/colors';
import { motion } from 'framer-motion';
import ItemNaoEncontrado from '@components/itemNaoEncontrado';


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
  useFetch("/api/methodsdatabase/getall", pagina, "cruzamento", searchString) :
  useFetch("/api/methodsdatabase/getall", pagina, "cruzamento")

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
      <br/>
    
    {data.result.length ?
    <CustomTable 
      childrenCabecarioTable={
        <TableRow>
          <TableCell style={{background: "#e1ebf0"}}>Id (Financeiro)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Número NF (Financeiro)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Vendedor (Financeiro)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Cliente (Financeiro)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Valor(Financeiro)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Status (Financeiro)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Status (Expedicao)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Status (Expedicao 2)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Status (Logistica)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Status (Confirmacao Entrega)</TableCell>
          <TableCell style={{background: "#e1ebf0"}}>Status (Canhoto)</TableCell>
        </TableRow>
      }
      childrenRowTable={
        data.result.map((item:any, index:number) => {
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

            <TableCell style={item.notaFiscal == undefined ? {background: "yellow"} : {}}>
                          {item.notaFiscal ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

            <TableCell style={item?.financeiroPassagem[0]?.vendedor == undefined ? {background: "red"} : {}}>
                          {item?.financeiroPassagem[0]?.vendedor ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

            <TableCell style={item?.financeiroPassagem[0]?.cliente == undefined ? {background: "yellow"} : {}}>
                          {item?.financeiroPassagem[0]?.cliente ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

            <TableCell style={item?.financeiroPassagem[0]?.valor == undefined ? {background: "yellow"} : {}}>
                          {item?.financeiroPassagem[0]?.valor ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

            <TableCell style={
                      item?.financeiroPassagem[0]?.statusNotaFiscal == "Cancelada"? color.financeiro.cancelada : 
                      item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Emitida" ? color.financeiro.emitida :
                      item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Retornou" ? color.financeiro.retornou :
                      item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Boleto em aberto" ? color.financeiro.boletoAberto : 
                      item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Aguardando deposito" ? color.financeiro.aguardadoDeposito : 
                      item?.financeiroPassagem[0]?.statusNotaFiscal ==  "Pendente" ? color.financeiro.pendente : {}
                    }>{item?.financeiroPassagem[0]?.statusNotaFiscal}</TableCell>




            <TableCell style={
                      item?.expedicaoPassagem[0]?.statusNotaFiscal == "Cliente Retirou"? color.expedicao.clienteRetirou : 
                      item?.expedicaoPassagem[0]?.statusNotaFiscal ==  "Aguardando Cliente" ? color.expedicao.pendente :{}
                    }>{item?.expedicaoPassagem[0]?.statusNotaFiscal}</TableCell>

            <TableCell style={
                      item?.expedicao2Passagem[0]?.statusNotaFiscal == "Cliente Retirou"? color.expedicao2.clienteRetirou :
                      item?.expedicao2Passagem[0]?.statusNotaFiscal == "Aguardando Transportadora"? color.expedicao2.aguardandoTransportadora :
                      item?.expedicao2Passagem[0]?.statusNotaFiscal ==  "Aguardando Cliente" ? color.expedicao2.aguardandoCliente :{}
                    }>{item?.expedicao2Passagem[0]?.statusNotaFiscal}</TableCell>
            
            <TableCell style={
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - ALEXANDRE"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - Dionathan"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - DOUGLAS"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - IGON"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - JULIANO"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - MATHEUS"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - PAULO ALEXANDRE"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - VANDERLEI"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - VILNEI"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - MAX"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - CRISTIANO"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal == "Em Transito - WILLIAM"? color.logistica.emTransito :
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "Aguardando Rota" ? color.logistica.aguardandoRota :
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "Aguardando Vendedor" ? color.logistica.aguardandoVendedor :
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "Boleto em aberto" ? color.logistica.emTransito : 
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "Em Transito" ? color.logistica.emTransito : 
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "Pendente" ? color.financeiro.cancelada : {}
                    }>{item?.logisticaPassagem[0]?.statusNotaFiscal}</TableCell>

            
            {/* //! o 1 do dado abaixo referencia ao confirmção entrega*/}
            <TableCell style={
                      data.nonFlux[1][index].entregaConcluida == "Sim" ? {background: "#38f269"} : {}
                    }>{data.nonFlux[1][index].entregaConcluida}</TableCell>
            {/* //! o 0 do dado abaixo referencia ao canhoto*/}
            <TableCell style={
                      data.nonFlux[0][index].statusCanhoto == "Concluido" ? {background: "#38f269"} : {}
                    }>{data.nonFlux[0][index].statusCanhoto}</TableCell>

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