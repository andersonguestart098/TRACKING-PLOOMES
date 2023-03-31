import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"
import { ModelFinanceiro } from '~/models/setoresInterface';
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';

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

  const [travarAuto, setTravarAuto ] = useState(false)
  const [searchString, setSearchString ] = useState("{}")
  const [filter, setFilter ] = useState(['notaFiscal'])
  const [filterInput, setFilterInput ] = useState('notaFiscal')
  
  const [valueInputChange, setValueInputChange ] = useState('')

  console.log(searchString)

  React.useEffect(() => {
    if(searchString == "") {
      setTravarAuto(false)
    }
  }, [searchString])
  
  const {data, isLoading} = travarAuto ?
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro", searchString) : 
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro")


  if(isLoading) {
    return <div style={{display: "flex", height: "100vh", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  }


  return (
    <>
      <CustomNavBar setor="FINANCEIRO"
      setSearchString={setSearchString}
      setValueInputChange={setValueInputChange}
      searchString={searchString}
      filter={filterInput}
      setSearch={setTravarAuto}
      dados={dataAuth} 
      filterData={[["notaFiscal", "cliente"],[
        {author: {
            notaFiscal: valueInputChange
        }},
        {cliente: {
            contains: valueInputChange
        }}
      ]]} 
      />
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
      {data.result.length ?
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Data|Hora</TableCell>
              <TableCell>Vendedor</TableCell>
              <TableCell>Orçamento</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Tipo|Faturamento</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Forma|Pagamento</TableCell>
              <TableCell>Parcelas</TableCell>
              <TableCell>Venda|Frete</TableCell>
              <TableCell>Retira|Entrega</TableCell>
              <TableCell>Frete|Conta</TableCell>
              <TableCell>Entrega|Cadastro</TableCell>
              <TableCell>Local|Cobrança</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Tipo|Frete</TableCell>
              <TableCell>Valor|Frete</TableCell>
              <TableCell>Data|Entrega</TableCell>
              <TableCell>Número|NF</TableCell>
              <TableCell>Status|NF</TableCell>
              <TableCell>Operador|NF</TableCell>
              <TableCell>Exped|Log</TableCell>
              <TableCell>Responsável|NF</TableCell>
              <TableCell>Observação</TableCell>
        </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelFinanceiro) => {
            return (
              <TableRow
                  key={item.id}
                  style={
                    item.statusNotaFiscal == "Cancelada"? {background: "#d62013"} : 
                    item.statusNotaFiscal ==  "Emitida" ? {background: "#38f269"} :
                    item.statusNotaFiscal ==  "Retornou" ? {background: "#d851f0"} :
                    item.statusNotaFiscal ==  "Boleto em aberto" ? {background: "#eb8c34"} : 
                    item.statusNotaFiscal ==  "Aguardando deposito" ? {background: "#cc34eb"} : 
                    item.statusNotaFiscal ==  "Pendente" ? {background: "#f28538"} : {}
                  }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.vendedor}</TableCell>
                  <TableCell>{item.orcamento}</TableCell>
                  <TableCell>
                  <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_cliente"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_tipoFaturamento"
                    />
                  </TableCell>
                  <TableCell>{item.valor}</TableCell>
                  <TableCell>{item.formaPagamento}</TableCell>
                  <TableCell>{item.parcelas}</TableCell>
                  <TableCell>
                    <CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_vendaFrete"
                      value="vendaFrete"
                      tags={["boolean"]}
                      />
                  </TableCell>
                  <TableCell>{item.retiraEntrega}</TableCell>
                  <TableCell>{item.freteConta}</TableCell>
                  <TableCell>
                    <CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_entregaCadastro"
                      value="entregaCadastro"
                      tags={["boolean"]}
                      />
                  </TableCell>
                  <TableCell>{item.localCobranca}</TableCell>
                  <TableCell>{item.observacao}</TableCell>
                  <TableCell>{item.tipoFrete}</TableCell>
                  <TableCell>{item.valorFrete}</TableCell>
                  <TableCell>{item.dataEntrega}</TableCell>
                  <TableCell>
                    <CustomInput 
                      key={item.id}
                      typeInput="number"
                      item={item.author}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_notaFiscal"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_statusNotaFiscal"
                      value="statusNotaFiscal"
                      tags={["Pendente","Emitida", "Cancelada", "Retornou", "Boleto em aberto", "Aguardando deposito"]}
                      />
                  </TableCell>
                  <TableCell>
                    <CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_operadorNotaFiscal"
                      value="operadorNotaFiscal"
                      tags={[
                        "Rosi", "Aprendiz", "Julia"
                      ]}
                    />
                  </TableCell>
                  <TableCell>
                    <CustomSelect 
                      key={item.id}
                      item={item.author}
                      routerEdit="/api/methodsdatabase/mudancaPassagem"
                      metadata={"_"+item.author?.expedicao}
                      value="expedicao"
                      tags={["expedicao", "expedicao2", "logistica"]}
                      />
                  </TableCell>
                  <TableCell>
                  <CustomSelect 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_responsavelNotaFiscal"
                      value="responsavelNotaFiscal"
                      tags={[
                        "Max", "Eduardo", "Cristiano S.", "Manoel", "Cristinao D."
                      ]}
                      />
                  </TableCell>
                  <TableCell>
                    <CustomInput 
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_observacaoFinanceiro"
                    />
                  </TableCell>
                </TableRow>
            )
        })
      } paginacao={
        <Pagination onChange={(_, value) => { 
            value = value -1
            setPagina(value)
          }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/3)} />
      } />
      : <>Nenhum dado no momento</>
      }
    </>
  )
}

export default index