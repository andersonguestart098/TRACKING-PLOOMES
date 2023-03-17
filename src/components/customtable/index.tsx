import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom } from '@mui/material'
import { ModelFinanceiro } from '@models/setoresInterface'
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import CustomInput from "../customInput"
import CustomSelect from "../customSelect"



type objectDataBase = {
  result:  ModelFinanceiro[],
  lengthDB: number
}

interface Props {
  childrenRowTable: React.ReactNode
  childrenCabecarioTable: React.ReactNode
  paginacao: React.ReactNode
}

const Index = ({ childrenCabecarioTable, childrenRowTable, paginacao }: Props) => {  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="a dense table">
          <TableHead>
            {childrenCabecarioTable}
        </TableHead>
        <TableBody>
          {childrenRowTable}
        </TableBody>
      </Table>
      </TableContainer>
      {paginacao}
    </div>
  )
}

export default Index
