import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelCanhoto, ModelCanhotoRetirado } from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';
import { BorderLeft } from '@mui/icons-material';

type Props = {}

const retorno = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [disabilitarBotao, setDisabilitarBotao] = useState(false)
  const [notas, setNotas] = React.useState("")
  const [notasVisual, setNotasVisual] = React.useState([""])

  const defaultValues = {
    activitiesbefore: "",
  }

  React.useEffect(()=> {
    let notasLocal = notas.split(",")
      setNotasVisual(notasLocal)
  },[notas])

  async function onSubmit(e: any) {
    setDisabilitarBotao(true)
    for(let nota in notasVisual) {
      if(notasVisual[nota]?.trim().length != 0) {
        const dadosCanhotoRetirado: ModelCanhotoRetirado = {
          notaFiscal: Number(notasVisual[nota]),
          responsavel: e.responsavel,
          motivo: e.motivo,
          setor: "canhotoRetirado"
        }
        await sendThisToDatabase("/api/methodsdatabase/create", dadosCanhotoRetirado, 300)
      }
    }
    window.location.reload()
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{width: 70, marginLeft: 15, marginTop: 15}} />
      <form 
      
      onSubmit={handleSubmit(onSubmit)}
      style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh"}}> 
      <h3 style={{textAlign: "center", marginBottom: 30}}>Canhoto Retirado</h3>    
              <CustomSelect_Widget
               labelText={'Responsável:'} 
               register={register("responsavel")}
               itens={[
                {value: "MARCIA", visualValue: "MARCIA"},
                {value: "JULIA", visualValue: "JULIA"},
                {value: "RENITA", visualValue: "RENITA"},
                {value: "NADIA", visualValue: "NADIA"}
              ]}
               />
              <br/><br/>
              <TextField 
              {...register("notaFiscal")}
              value={notas}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNotas(event.target.value);
              }}
              sx={{width: 250}} 
               required 
              id="notaFiscal" label="Número Nota Fiscal" 
              variant="outlined" />
              <div style={{marginTop: 5}}>
              <p>Número dos canhotos retirados</p>
              <div style={{display: "flex",flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                {
                  notasVisual.map((item,index) => {
                    return <div key={index} style={{marginLeft: 4, color: "#fff", background: "#058FED", padding: 10, borderRadius: 5}}>{item}</div>
                  })
                }
                </div>
              </div>
              <br/>
              <TextField 
                  {...register("motivo")} 
                  sx={{width: 250, height: 150}} 
                  type="text" 
                  id="motivo" label="Motivo" 
                  variant="outlined" />

              <Button type="submit" variant="contained" sx={{width: 250, padding: 2}} disabled={disabilitarBotao}>Enviar</Button>
          </form>
    </div>
  )
}

export default retorno