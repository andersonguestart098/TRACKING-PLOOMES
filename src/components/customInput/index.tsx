import React, { useEffect, useState } from 'react'
import { editDataController } from '@services/prisma/editData';
import { databaseRepository } from '@repositories/mutateData';
import { useForm } from "react-hook-form";
import { ModelFinanceiro } from '@models/setoresInterface';

interface Props {
    routerEdit: string
    item: ModelFinanceiro | any
    metadata: string
    typeInput?: React.HTMLInputTypeAttribute
    setor?: string
    valorPadrao?: string
    bg?: string
}

const Index = ({routerEdit, item, metadata, typeInput, setor, valorPadrao, bg}: Props) => {
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({
        defaultValues: {
          [item.id+metadata]: item[metadata.replace("_", "")]?.toString()
        }
    })

    useEffect(() => {
        reset({
            [item.id+metadata]: item[metadata.replace("_", "")]?.toString() 
        })
    }, [item[metadata.replace("_", "")]?.toString()])

    function onSubmit(sendThis: string, value: string) { 
      console.log("OK");
      
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
    <form onSubmit={handleSubmit(event => onSubmit(item.id+metadata, getValues(item.id+metadata)))}>
        <input type={typeInput ?? "text"} style={{border: "none", background: bg ?? "transparent"}} {...register(item.id+metadata, {required: true})} />
    </form>
  )
}

export default Index