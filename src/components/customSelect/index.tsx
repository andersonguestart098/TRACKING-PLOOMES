import React from 'react'
import { databaseRepository } from '@repositories/mutateData'
import { editDataController } from '@services/prisma/editData'
import { ModelFinanceiro } from '@models/setoresInterface';

interface Props {
    value: string
    tags: string[]
    routerEdit: string
    item: ModelFinanceiro | any
    metadata: string
    setor?: string
}

const Index = ({routerEdit, item, metadata, value, tags, setor}: Props) => {

  function onSubmit(sendThis: string, value: string | boolean) { 
    if(tags[0] == "boolean"){
      if(value == "true") {
        value = true
      } else {
        value = false
      }
    }
    return new editDataController(
      new databaseRepository
    ).execute({
      router: routerEdit, 
      metadata: sendThis, 
      value: value,
      setor: setor ?? "financeiro"
    })
  }

  return (
      <select style={{border: "none", background: "transparent"}} onChange={(e) => onSubmit(item.id+metadata, e.target.value)}>
        <option value="false" selected disabled>{typeof item[value] ==  "boolean" ? item[value] ? 'Sim' : "Não" : item[value]}</option>
        {tags[0] == "boolean" ? (
          <>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </>
        ) : tags.map(item => <option value={item}>{item}</option>
        )}
      </select>
  )
}

export default Index