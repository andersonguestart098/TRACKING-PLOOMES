import { MenuItem, Select, SelectChangeEvent, InputLabel, FormControl } from '@mui/material'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { databaseRepository } from '@repositories/mutateData'
import { editDataController } from '@services/prisma/editData'
import { ModelFinanceiro } from '@models/financeiro/financeiroSchema';
import { useForm } from 'react-hook-form';

interface Props {
    valor: boolean
    routerEdit: string
    item: ModelFinanceiro | any
    metadata: string
}

const Index = ({valor, routerEdit, item, metadata}: Props) => {

  function onSubmit(sendThis: string, value: string | boolean) { 
    if(value == "true") {
      value = true
    } else {
      value = false
    }

    return new editDataController(
      new databaseRepository
    ).execute({
      router: routerEdit, 
      metadata: sendThis, 
      value: value
    })
  }

  return (
      <select style={{border: "none"}} onChange={(e) => onSubmit(item.id+metadata, e.target.value)}>
        <option value="false" selected disabled>{item.vendaFrete ? 'Sim' : "Não"}</option>
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
  )
}

export default Index