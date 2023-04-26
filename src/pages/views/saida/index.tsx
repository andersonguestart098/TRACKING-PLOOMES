import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelSaida } from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';
import Loader from '@components/loader';
import color from '~/config/colors';

import { Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomSelect_Widget from '~/components/customSelect_widget';
import ItemNaoEncontrado from '~/components/itemNaoEncontrado';

interface typeDB {
    result: ModelSaida[]
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
  
  const {data, isLoading} = travarAuto ?
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "saida", searchString) : 
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "saida")
      

  //! LOADER DE CARREGAMENTO
  if(isLoading) {
    return (
      <Loader />
    )
  }



  if(isLoading) {
    return <div style={{display: "flex", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  }

  return (
    <>
      <CustomNavBar setor="CARREGAMENTO CAMINHÃO" 
      setSearchString={setSearchString}
      setValueInputChange={setValueInputChange}
      searchString={searchString}
      filter={filterInput}
      setSearch={setTravarAuto}
      dados={dataAuth} 
      filterData={[["cliente"],[
        {cliente: {
            contains: valueInputChange
        }}
      ]]} 
      />

      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{textAlign: "center"}}>
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
              <TableCell style={{background: "#e1ebf0"}}>Cód|Entrega</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Número|NF</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Conferente</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Placa</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Motorista</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Cidades|Destino</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Hodometro</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Observação</TableCell>
              
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelSaida) => {
            return (
              <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{new Date(String(item.createdAt)).getDate()}/{new Date(String(item.createdAt)).getMonth()+1}/{new Date(String(item.createdAt)).getFullYear()} 
                  <br/> {new Date(String(item.createdAt)).getHours()}:{new Date(String(item.createdAt)).getMinutes()}</TableCell>
                  <TableCell>{item.codigoEntrega}</TableCell>
                  <TableCell>
                  <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_notaFiscal"
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell><CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_nomeConferente"
                      value="nomeConferente"
                      tags={[
                        "Manoel", "Cristiano D.", "Max", "Eduardo", "Everton", "Cristiano S."
                      ]}
                      setor="saida"
                    /></TableCell>
                  <TableCell><CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_placa"
                      value="placa"
                      tags={[
                        "YW7921", "IWC5261", "JBD7E59", "IZT1E84", "IWW7921", "IVO1603",
                        "AZI2E30", "ITA7784", "IUT9476", "IST6840", "IVP0G05", "JBD9H36",
                        "IXH8706"
                      ]}
                      setor="saida"
                    /></TableCell>
                  <TableCell><CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_motorista"
                      value="motorista"
                      tags={[
                        "ALEXANDRE", "DIONATHA", "DOUGLAS", "IGON", "JULIANO", "MATHEUS",
                        "PAULO", "VANDERLEI", "VILNEI", "MAX", "CRISTIANO", "WILLIAM",
                        "PAULO ALEXANDRE"
                      ]}
                      setor="saida"
                    /></TableCell>
                  <TableCell>
                  <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_cidadeDestino"
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                  <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_hodometro"
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                  <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_obs"
                      setor="saida"
                    />
                  </TableCell>
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