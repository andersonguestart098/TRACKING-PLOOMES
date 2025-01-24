import { Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelRetorno, ModelTeste } from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';

type Props = {}

const retorno = (props: Props) => {
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
        const dadosTeste: ModelTeste = {
          notaFiscal: Number(notasVisual[nota]),
          teste: e.teste,
          setor: "teste"
        }
        await sendThisToDatabase("/api/methodsdatabase/create", dadosTeste, 300)
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
        <h3 style={{textAlign: "center", marginBottom: 30}}>Retorno da Entrega</h3>
              <TextField 
              {...register("notaFiscal")}
              value={notas}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNotas(event.target.value);
              }}
              sx={{width: 250}} 
              required 
              id="notaFiscal" label="Numero Nota Fiscal"
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
              <br/>
                  <TextField 
                  {...register("teste")} 
                  sx={{width: 250}} 
                  type="text" 
                  id="teste" label="Teste" 
                  variant="outlined" />
                  <br/><br/>

              <Button type="submit" disabled={disabilitarBotao} variant="contained">Enviar</Button>
          </form>
    </div>
  )
}

export default retorno