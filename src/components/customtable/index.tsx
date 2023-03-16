import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from '@mui/material'
import { ModelFinanceiro } from '~/models/financeiro/financeiroSchema'
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import CustomInput from "../customInput"



type objectDataBase = {
  result:  ModelFinanceiro[],
  lengthDB: number
}

interface Props {
  data: objectDataBase,
  setPagina: Dispatch<SetStateAction<number>>
}

const Index = ({ data, setPagina }: Props) => {  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Data|Hora</TableCell>
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
              <TableCell>Expedicao ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.result.map((item: ModelFinanceiro) => {
            return (
              <TableRow
                  key={item.id}
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
                  <TableCell>{item.vendaFrete ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.retiraEntrega}</TableCell>
                  <TableCell>{item.freteConta}</TableCell>
                  <TableCell>{item.entregaCadastro ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.localCobranca}</TableCell>
                  <TableCell>{item.author?.notaFiscal}</TableCell>
                </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </TableContainer>
      <Pagination onChange={(_, value) => { 
        value = value -1
        setPagina(value)
      }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/3)} />
    </div>
  )
}

export default Index
