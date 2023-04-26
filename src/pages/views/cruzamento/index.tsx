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
      <CustomNavBar setor="RASTREAMENTO"
      setSearchString={setSearchString}
      setValueInputChange={setValueInputChange}
      searchString={searchString}
      filter={filterInput}
      setSearch={setTravarAuto}
      dados={dataAuth} 
      filterData={[["cliente"],[
        {financeiroPassagem:{every:{cliente: {
            contains: valueInputChange
        }}}}
      ]]} />
      
      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}

      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
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

            <TableCell style={item?.cliente == undefined ? {background: "yellow"} : {}}>
                          {item?.cliente ?? "NAO ENVIADO A ESSE SETOR" }</TableCell>

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
                      item?.expedicaoPassagem[0]?.statusNotaFiscal == "a definir"? color.expedicao.naoDefinido :
                      item?.expedicaoPassagem[0]?.statusNotaFiscal == "Em Separação"? color.expedicao.emSeparacao :
                      item?.expedicaoPassagem[0]?.statusNotaFiscal ==  "Aguardando Cliente" ? color.expedicao.pendente :{}
                    }>{item?.expedicaoPassagem[0]?.statusNotaFiscal}</TableCell>

            <TableCell style={

                      item?.expedicao2Passagem[0]?.statusNotaFiscal == "Cliente Retirou"? color.expedicao2.clienteRetirou :
                      item?.expedicao2Passagem[0]?.statusNotaFiscal == "Aguardando Transportadora"? color.expedicao2.aguardandoTransportadora :
                      item?.expedicao2Passagem[0]?.statusNotaFiscal == "a definir"? color.expedicao.naoDefinido :
                      item?.expedicao2Passagem[0]?.statusNotaFiscal == "Em Separação"? color.expedicao.emSeparacao :
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
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "a definir" ? color.logistica.naoDefinido :
                      item?.logisticaPassagem[0]?.statusNotaFiscal ==  "Em Separação" ? color.logistica.emSeparacao :
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