import React, { useEffect, useState } from 'react'
import { editDataController } from '@services/prisma/editData';
import { databaseRepository } from '@repositories/mutateData';
import { useForm } from "react-hook-form";
import { ModelFinanceiro } from '@models/financeiro/financeiroSchema';

interface Props {
    routerEdit: string
    item: ModelFinanceiro | any
    metadata: string
}

const Index = ({routerEdit, item, metadata}: Props) => {
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
            [item.id+metadata]: item[metadata.replace("_", "")].toString()
        }
    })

    useEffect(() => {
        reset({
            [item.id+metadata]: item[metadata.replace("_", "")].toString() 
        })
    }, [item[metadata.replace("_", "")].toString()])

    function onSubmit(sendThis: string, value: string) { 
        return new editDataController(
          new databaseRepository
        ).execute({
          router: routerEdit, 
          metadata: sendThis, 
          value: value
        })
      }


  return (
    <form onSubmit={handleSubmit(event => onSubmit(item.id+metadata, getValues(item.id+metadata)))}>
        <input style={{border: "none"}} {...register(item.id+metadata, {required: true})} />
    </form>
  )
}

export default Index