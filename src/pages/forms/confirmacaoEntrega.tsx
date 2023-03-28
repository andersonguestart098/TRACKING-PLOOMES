import { Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelConfirmacaoEntrega} from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';

type Props = {}

const confirmacaoEntrega = (props: Props) => {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm()

  function onSubmit(e: any) {
    const dadosConfirmacaoEntrega: ModelConfirmacaoEntrega = {
      codigoEntrega: e.codigoEntrega,
      motorista: e.motorista,
      cidade: e.cidade,
      entregaConcluida: e.entregaConcluida,
      obs: e.obs,
      setor: "confirmacao entrega"
    }
    sendThisToDatabase("/api/methodsdatabase/create", dadosConfirmacaoEntrega)
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{width: 70, marginLeft: 15, marginTop: 15}} />
      <form  
      onSubmit={handleSubmit(onSubmit)}
      style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", marginTop: 15}}> 
              <TextField 
              {...register("codigoEntrega")} 
              sx={{width: 250}} 
              type="number" required 
              id="codigoEntrega" label="Código da entrega" 
              variant="outlined" />
              <br/><br/>
              <CustomSelect_Widget
               labelText={'Motorista:'} 
               register={register("motorista")} 
               itens={[
                {value: "ALEXANDRE", visualValue: "ALEXANDRE"},
                {value: "DIONATHA", visualValue: "DIONATHA"},
                {value: "DOUGLAS", visualValue: "DOUGLAS"},
                {value: "IGON", visualValue: "IGON"},
                {value: "JULIANO", visualValue: "JULIANO"},
                {value: "MATHEUS", visualValue: "MATHEUS"},
                {value: "PAULO", visualValue: "PAULO"},
                {value: "VANDERLEI", visualValue: "VANDERLEI"},
                {value: "VILNEI", visualValue: "VILNEI"},
                {value: "MAX", visualValue: "MAX"},
                {value: "PAULO VITOR", visualValue: "PAULO VITOR"},
                {value: "CRISTIANO", visualValue: "CRISTIANO"},
                {value: "WILLIAM", visualValue: "WILLIAM"},
                {value: "PAULO ALEXANDRE", visualValue: "PAULO ALEXANDRE"}
               ]}  
               />
              <br/><br/>
              <TextField 
              {...register("cidade")} 
              sx={{width: 250}} 
              type="text" required 
              id="cidade" label="Cidade" 
              variant="outlined" />
              <br/>
              <CustomSelect_Widget
               labelText={'entregaConcluida:'} 
               register={register("entregaConcluida")} 
               itens={[
                {value: "Sim", visualValue: "Sim"},
                {value: "Não", visualValue: "Não"},
               ]}  
               />
              <br/><br/>
                  <TextField 
                  {...register("obs")} 
                  sx={{width: 250}} 
                  type="text" required 
                  id="obs" label="Observações" 
                  variant="outlined" />
                  <br/><br/>

              <Button type="submit" variant="contained">Enviar</Button>
          </form>
    </div>
  )
}

export default confirmacaoEntrega