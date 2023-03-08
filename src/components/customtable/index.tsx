import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface Props {
}

const Index = ({}: Props) => {
    const rows = [
        {nome:'Frozen yoghurt', numero: '3/3/2023 15:41', vendedor: 'marcia',
         orcamento: 625111, cliente: 'TMJ', tipoFaturamento: 'normal', valor: '200.00',
            formaPagamento: 'Cartão', parcelas: '5x', vendaFrete: 'Sim', retiraEntrega: 'Entrega',
                freteConta: 'Cemear', entregaCadastro: 'Sim', localCobranca: 'Cobrar local',
                    },

        {nome:'Ice cream sandwich', numero: 237},
        {nome:'Eclair', numero: 262},
        {nome:'Cupcake', numero: 305},
        {nome:'Gingerbread', numero: 356},
      ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({nome, numero, vendedor, orcamento, cliente, tipoFaturamento,
           valor, formaPagamento, parcelas, vendaFrete, retiraEntrega, freteConta,
            entregaCadastro, localCobranca}) => (
            <TableRow
              key={nome}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {nome}
              </TableCell>
              <TableCell>{numero}</TableCell>
              <TableCell>{vendedor}</TableCell>
              <TableCell>{orcamento}</TableCell>
              <TableCell>{cliente}</TableCell>
              <TableCell>{tipoFaturamento}</TableCell>
              <TableCell>{valor}</TableCell>
              <TableCell>{formaPagamento}</TableCell>
              <TableCell>{parcelas}</TableCell>
              <TableCell>{vendaFrete}</TableCell>
              <TableCell>{retiraEntrega}</TableCell>
              <TableCell>{freteConta}</TableCell>
              <TableCell>{entregaCadastro}</TableCell>
              <TableCell>{localCobranca}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Index