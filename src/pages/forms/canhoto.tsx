import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelCanhoto } from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';
import { BorderLeft } from '@mui/icons-material';

type Props = {}

const retorno = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [disabilitarBotao, setDisabilitarBotao] = useState(false)
  const [notas, setNotas] = React.useState([1])

  const defaultValues = {
    activitiesbefore: "",
  }

  async function onSubmit(e: any) {
    setDisabilitarBotao(true)
    const dadosCanhoto: ModelCanhoto = {
      motorista: e.motorista,
      numeroNotaFiscal: e.numeroNotaFiscal,
      responsavelCanhoto: e.quemRecebeu,
      statusCanhoto: "Concluido",
      setor: "canhoto"
    }
    await sendThisToDatabase("/api/methodsdatabase/create", dadosCanhoto)
    window.location.reload()
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{width: 70, marginLeft: 15, marginTop: 15}} />
      <form 
      
      onSubmit={handleSubmit(onSubmit)}
      style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh"}}> 
      <h3 style={{textAlign: "center", marginBottom: 30}}>Canhoto</h3>    
              <CustomSelect_Widget
               labelText={'Quem Recebeu:'} 
               register={register("quemRecebeu")}
               itens={[
                {value: "MARCIA", visualValue: "MARCIA"},
                {value: "JULIA", visualValue: "JULIA"},
                {value: "RENITA", visualValue: "RENITA"},
                {value: "NADIA", visualValue: "NADIA"},
              ]}
               />
              <br/><br/>
              <TextField 
              {...register("numeroNotaFiscal")}
              onChange={(e) => {
                let valor = e.target.value
                let items = valor.split(",")
                let currentNotas = notas
                console.log(items)
                console.log(notas)
                items.map(item => {
                  currentNotas.push(Number(item))
                })
                setNotas(currentNotas)
                
              }} 
              sx={{width: 250}} 
               required 
              id="numeroNotaFiscal" label="Numero Nota Fiscal" 
              variant="outlined" />
              <div style={{marginTop: 5}}>
              <p>Numero de Notas a serem enviadas</p>
              <div style={{display: "flex",flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                {
                  notas.map((_, i) => {
                    return <Box
                    key={i}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: 2,
                      backgroundColor: 'primary.dark',
                      marginLeft: 2
                    }}
                  />
                  })
                }
                </div>
              </div>
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
                {value: "VANDERLEI", visualValue: "VANDERLEI"},
                {value: "VILNEI", visualValue: "VILNEI"},
                {value: "WILLIAM", visualValue: "WILLIAM"},
                {value: "PAULO ALEXANDRE", visualValue: "PAULO ALEXANDRE"},
                {value: "OUTROS", visualValue: "OUTROS"},
               ]}  
               />
              <br/><br/>
              <Button type="submit" variant="contained" sx={{width: 250, padding: 2}} disabled={disabilitarBotao}>Enviar</Button>
          </form>
    </div>
  )
}

export default retorno