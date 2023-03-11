import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ModelFinanceiro } from '~/models/financeiro/financeiroSchema'
import { useForm } from "react-hook-form";
import { mutateData } from '@controllers/mutateData';
import React, { Dispatch, SetStateAction } from "react"

type objectDataBase = {
  result:  ModelFinanceiro[],
  lengthDB: number
}

interface Props {
  data: objectDataBase,
  setPagina: Dispatch<SetStateAction<number>>
}

const Index = ({ data, setPagina }: Props) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  function onSubmit(sendThis: string, value: string) { 
    return new mutateData("/api/methodsdatabase/editDataWhere", sendThis, value).execute()
  }

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
                  <form onSubmit={handleSubmit(event => onSubmit(item.id+"_cliente", getValues(item.id+"_cliente")))}>
                  <input style={{border: "none"}} defaultValue={item.cliente} {...register(item.id+"_cliente", {required: true})} />
                  </form>
                  </TableCell>
                  <TableCell>
                    <form onSubmit={handleSubmit(event => onSubmit(item.id+"_tipoFaturamento", getValues(item.id+"_tipoFaturamento")))}>
                      <input style={{border: "none"}} defaultValue={item.tipoFaturamento} {...register(item.id+"_tipoFaturamento", {required: true})} />
                    </form>
                  </TableCell>
                  <TableCell>{item.valor}</TableCell>
                  <TableCell>{item.formaPagamento}</TableCell>
                  <TableCell>{item.parcelas}</TableCell>
                  <TableCell>{item.vendaFrete ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.retiraEntrega}</TableCell>
                  <TableCell>{item.freteConta}</TableCell>
                  <TableCell>{item.entregaCadastro ? "Sim" : "Não"}</TableCell>
                  <TableCell>{item.localCobranca}</TableCell>
                </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </TableContainer>
      <Pagination onChange={(_, value) => { 
        value = value -1
        setPagina(value)
      }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={data.lengthDB/3} />
    </div>
  )
}

export default Index
