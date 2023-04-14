import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelConfirmacaoEntrega} from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';
import { motion } from 'framer-motion';
import { Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import Loader from '~/components/loader';
import CustomSelect_Widget from '~/components/customSelect_widget';
import color from '~/config/colors';
import ItemNaoEncontrado from '~/components/itemNaoEncontrado';

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
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "confirmacaoEntrega", searchString) :
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "confirmacaoEntrega")



  //! LOADER DE CARREGAMENTO
  if(isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <CustomNavBar setor="CONFIRMAÇÃO DE ENTREGA" 
      setSearchString={setSearchString}
      setValueInputChange={setValueInputChange}
      searchString={searchString}
      filter={filterInput}
      setSearch={setTravarAuto}
      dados={dataAuth} 
      filterData={[["cidade"],[
        {cidade: {
            contains: valueInputChange
        }}
      ]]} 
      />

      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{textAlign: "center"}}>
        <p>Filtrar ao digitar: </p>
        <div>
          <Chip onClick={() => {
            setFilterInput("notaFiscal")
          }} sx={filterInput == "notaFiscal" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Numero de Nota Fiscal"  variant="outlined" />
          
          <Chip onClick={() => { 
            setFilterInput("cidade")
          }} sx={filterInput == "cidade" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Cidade"  variant="outlined" />
        </div>
        <p>Filtro rapido: </p>
        <div style={{display: "flex", justifyContent: "space-between", marginLeft: 15, marginRight: 15}}>
          <CustomSelect_Widget 
          itens={[
            {value: "Sim", visualValue: "Sim"},
            {value: "Não", visualValue: "Não"},
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.entregaConcluida = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Entrega Concluida'}          
          />
          <CustomSelect_Widget 
          itens={[
              {value: "ALEXANDRE", visualValue: "ALEXANDRE"},
              {value: "DIONATHA", visualValue: "DIONATHA"},
              {value: "DOUGLAS", visualValue: "DOUGLAS"},
              {value: "IGON", visualValue: "IGON"},
              {value: "JULIANO", visualValue: "JULIANO"},
              {value: "MATHEUS", visualValue: "MATHEUS"},
              {value: "PAULO", visualValue: "PAULO"},
              {value: "VANDERLEI", visualValue: "VANDERLEI"},
              {value: "VILNEI", visualValue: "VILNEI"},
              {value: "MAX", visualValue: "MAX"},
              {value: "PAULO VITOR", visualValue: "PAULO VITOR"},
              {value: "CRISTIANO", visualValue: "CRISTIANO"},
              {value: "WILLIAM", visualValue: "WILLIAM"},
              {value: "PAULO ALEXANDRE", visualValue: "PAULO ALEXANDRE"}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.motorista = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Motorista'}          
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
              <TableCell style={{background: "#e1ebf0"}}>Id</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Data|Hora</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Motorista</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Nota Fiscal</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Cidade</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Entrega|Concluída</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Observação</TableCell>
              
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelConfirmacaoEntrega) => {
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
                  style={
                    item.entregaConcluida == "Sim" ? color.confirmacaoEntrega.sim : color.confirmacaoEntrega.nao
                  }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{new Date(String(item.createdAt)).getDate()}/{new Date(String(item.createdAt)).getMonth()+1}/{new Date(String(item.createdAt)).getFullYear()} 
                  <br/> {new Date(String(item.createdAt)).getHours()}:{new Date(String(item.createdAt)).getMinutes()}</TableCell>
                  <TableCell>{item.motorista}</TableCell>
                  <TableCell>{item.notaFiscal}</TableCell>
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
          }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/40)} />
      }/>
    : <ItemNaoEncontrado />}
    </>
  )
}

export default index