import React, { useState } from 'react'
import { useFetch } from "@hooks/useFetch";
import { Chip, Pagination, TableCell, TableRow } from "@mui/material";
import CustomTable from "@components/customtable"
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import CustomNavBar from "@components/customAppBar"
import { ModelFinanceiro } from '@models/setoresInterface';
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';
import CustomSelect_Widget from '@components/customSelect_widget';
import { motion } from 'framer-motion';
import ItemNaoEncontrado from '@components/itemNaoEncontrado';
import Loader from '@components/loader';
import color from '~/config/colors';

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

  //! VALOR PADRAO DE FILTRO DE PESQUISA (VALOR DO DB)
  const [filterInput, setFilterInput ] = useState('notaFiscal')
  
  const [valueInputChange, setValueInputChange ] = useState('')

  React.useEffect(() => {
    if(searchString == "{}") {
      setTravarAuto(false)
    }
  }, [searchString])
  
  const {data, isLoading, isValidating} = travarAuto ?
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro", searchString) : 
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro")
      

  //! LOADER DE CARREGAMENTO
  if(isLoading) {
    return (
      <Loader />
    )
  }


  return (
    <>
      {/* //! BARRA DE PESQUISA */}
      <CustomNavBar setor="FINANCEIRO"
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
      <br/>
      {/* //! TABELA CABEÇALHO */}
      {data.result.length ?
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell style={{background: "#e1ebf0"}}>Id</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Data|Hora</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Vendedor</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Orçamento</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Cliente</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Tipo|Faturamento</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Valor</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Forma|Pagamento</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Parcelas</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Venda|Frete</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Retira|Entrega</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Frete|Conta</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Entrega|Cadastro</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Local|Cobrança</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Observações</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Tipo|Frete</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Valor|Frete</TableCell>
              <TableCell style={{background: "#e1ebf0"}}>Data|Entrega</TableCell>
              <TableCell style={{background: "#bedded"}}>Número|NF</TableCell>
              <TableCell style={{background: "#bedded"}}>Status|NF</TableCell>
              <TableCell style={{background: "#bedded"}}>Operador|NF</TableCell>
              <TableCell style={{background: "#bedded"}}>Exped|Log</TableCell>
              <TableCell style={{background: "#bedded"}}>Responsável|NF</TableCell>
              <TableCell style={{background: "#bedded"}}>Observação</TableCell>
        </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelFinanceiro) => {
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
                    item.statusNotaFiscal == "Cancelada"? color.financeiro.cancelada : 
                    item.statusNotaFiscal ==  "Emitida" ? color.financeiro.emitida :
                    item.statusNotaFiscal ==  "Retornou" ? color.financeiro.retornou :
                    item.statusNotaFiscal ==  "Boleto em aberto" ? color.financeiro.boletoAberto : 
                    item.statusNotaFiscal ==  "Aguardando deposito" ? color.financeiro.aguardadoDeposito : 
                    item.statusNotaFiscal ==  "Pendente" ? color.financeiro.pendente : {}
                  }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{new Date(String(item.createdAt)).getDate()}/{new Date(String(item.createdAt)).getMonth()+1}/{new Date(String(item.createdAt)).getFullYear()} 
                  <br/> {new Date(String(item.createdAt)).getHours()}:{new Date(String(item.createdAt)).getMinutes()}</TableCell>
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
                      bg={item.author?.notaFiscal != null ? undefined : "#f71900"}
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
        <Pagination 
            onChange={(_, value) => { 
            value = value -1
            setPagina(value)
          }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/40)} />
      } />
      : <ItemNaoEncontrado />
      }
    </>
  )
}

export default index