import { Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelConfirmacaoEntrega} from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';

type Props = {}

const confirmacaoEntrega = (props: Props) => {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm()

  const [disabilitarBotao, setDisabilitarBotao] = React.useState(false)
  const [notas, setNotas] = React.useState("")
  const [notasVisual, setNotasVisual] = React.useState([""])

  React.useEffect(()=> {
    let notasLocal = notas.split(",")
      setNotasVisual(notasLocal)
  },[notas])

  async function onSubmit(e: any) {
    setDisabilitarBotao(true)
    for(let nota in notasVisual) {
      if(notasVisual[nota]?.trim().length != 0) {
        const dadosConfirmacaoEntrega: ModelConfirmacaoEntrega = {
          notaFiscal: Number(notasVisual[nota]),
          motorista: e.motorista,
          cidade: e.cidade,
          entregaConcluida: e.entregaConcluida,
          obs: e.obs,
          setor: "confirmacao entrega"
        }
        await sendThisToDatabase("/api/methodsdatabase/create", dadosConfirmacaoEntrega, 300)
      }
    }
    window.location.reload()
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{width: 70, marginLeft: 15, marginTop: 15}} />
      <form  
      onSubmit={handleSubmit(onSubmit)}
      style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", marginTop: 15}}>
        <h3 style={{textAlign: "center", marginBottom: 30}}>Confirmação de Entrega</h3> 
              <TextField
              {...register("notaFiscal")} 
              value={notas}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNotas(event.target.value);
              }}
              sx={{width: 250}} 
              type="text" required 
              id="notaFiscal" label="Número da nota"
              variant="outlined" />

              <div style={{marginTop: 5}}>
              <p>Numero de Notas a serem enviadas</p>
              <div style={{display: "flex",flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                {
                  notasVisual.map((item,index) => {
                    return <div key={index} style={{marginLeft: 4, color: "#fff", background: "#058FED", padding: 10, borderRadius: 5}}>{item}</div>
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
              <br/><br/>
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

              <Button disabled={disabilitarBotao} type="submit" variant="contained">Enviar</Button>
          </form>
    </div>
  )
}

export default confirmacaoEntrega