import { Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelSaida } from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';

type Props = {}

const retorno = (props: Props) => {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm()

  function onSubmit(e: any) {
    const dadosSaida: ModelSaida = {
      motorista: e.motorista,
      notaFiscal: e.numeroNotaFiscal,
      cidadeDestino: e.cidadeDestino,
      codigoEntrega: e.codigoEntrega,
      hodometro: e.hodometro,
      nomeConferente: e.conferente,
      dataHoraSaida: e.dataHoraSaida,
      obs: e.obs,
      placa: e.placa,
      setor: "saida"
    }
    sendThisToDatabase("/api/methodsdatabase/create", dadosSaida)
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
              <TextField 
              {...register("numeroNotaFiscal")} 
              sx={{width: 250}} 
              type="number" required 
              id="numeroNotaFiscal" label="Número Nota Fiscal" 
              variant="outlined" />
              <br/>

              <CustomSelect_Widget
               labelText={'Conferente:'} 
               register={register("conferente")} 
               itens={[
                {value: "Max", visualValue: "Max"},
                {value: "Dudu", visualValue: "Dudu"},
                {value: "Cristiano", visualValue: "Cristiano"},
                {value: "Matheus", visualValue: "Matheus"},
                {value: "Manoel", visualValue: "Manoel"}
               ]}  
               />
              <br/><br/>
              <CustomSelect_Widget
               labelText={'Placa:'} 
               register={register("placa")} 
               itens={[
                {value: "YW7921", visualValue: "YW7921"},
                {value: "IWC5261", visualValue: "IWC5261"},
                {value: "JBD7E59", visualValue: "JBD7E59"},
                {value: "IZT1E84", visualValue: "IZT1E84"},
                {value: "IWW7921", visualValue: "IWW7921"},
                {value: "IVO1603", visualValue: "IVO1603"},
                {value: "AZI2E30", visualValue: "AZI2E30"},
                {value: "ITA7784", visualValue: "ITA7784"},
                {value: "IUT9476", visualValue: "IUT9476"},
                {value: "IST6840", visualValue: "IST6840"},
                {value: "IVP0G05", visualValue: "IVP0G05"},
                {value: "JBD9H36", visualValue: "JBD9H36"},
                {value: "IXH8706", visualValue: "IXH8706"}
               ]}  
               />
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
                  {...register("hodometro")} 
                  sx={{width: 250}} 
                  type="number" required 
                  id="hodometro" label="hodometro" 
                  variant="outlined" />
                  <br/><br/>

                  <TextField 
                  {...register("cidadeDestino")} 
                  sx={{width: 250}} 
                  required 
                  id="cidadeDestino" label="cidadeDestino" 
                  variant="outlined" />
                  <br/><br/>

                  <TextField 
                  {...register("dataHoraSaida")} 
                  sx={{width: 250}} 
                  type="datetime-local" required 
                  id="dataHoraSaida" 
                  variant="outlined" />
                  <br/><br/>

                  <TextField 
                  {...register("obs")} 
                  sx={{width: 250, height: 350}} 
                  type="text" required 
                  id="obs" label="Observação" 
                  variant="outlined" />
                  <br/><br/>



              <Button type="submit" variant="contained">Enviar</Button>
          </form>
    </div>
  )
}

export default retorno