import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelCanhoto } from '@models/setoresInterface';

type Props = {}

const retorno = (props: Props) => {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm()

  function onSubmit(e: any) {
    const dadosCanhoto: ModelCanhoto = {
      motorista: e.motorista,
      numeroNotaFiscal: e.numeroNotaFiscal,
      responsavelCanhoto: e.quemRecebeu,
      statusCanhoto: "Concluido",
      setor: "canhoto"
    }
    sendThisToDatabase("/api/methodsdatabase/create", dadosCanhoto)
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{width: 70, marginLeft: 15, marginTop: 15}} />
      <form 
      onSubmit={handleSubmit(onSubmit)}
      style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh"}}>          
              <InputLabel id="quemRecebeu">Quem Recebeu</InputLabel>
              <Select
                required
                {...register("quemRecebeu")}
                labelId="quemRecebeu"
                id="demo-simple-select"
                label="Quem Recebeu"
                sx={{width: 250}}
              >
                <MenuItem disabled value=" "></MenuItem>
                <MenuItem value="MARCIA">MARCIA</MenuItem>
                <MenuItem value="JULIA">JULIA</MenuItem>
                <MenuItem value="RENITA">RENITA</MenuItem>
                <MenuItem value="NADIA">NADIA</MenuItem>
              </Select>
              <br/><br/>
              <TextField 
              {...register("numeroNotaFiscal")} 
              sx={{width: 250}} 
              type="number" required 
              id="numeroNotaFiscal" label="Numero Nota Fiscal" 
              variant="outlined" />
              <br/><br/>
              <InputLabel id="motorista">Motorista</InputLabel>
                <Select
                  required
                  {...register("motorista")}
                  labelId="quemRecebeu"
                  id="demo-simple-select"
                  label="Motorista"
                  sx={{width: 250}}
                >
                  <MenuItem disabled value=" "></MenuItem>
                  <MenuItem value="ALEXANDRE">ALEXANDRE</MenuItem>
                  <MenuItem value="DIONATHA">DIONATHA</MenuItem>
                  <MenuItem value="DOUGLAS">DOUGLAS</MenuItem>
                  <MenuItem value="IGON">IGON</MenuItem>
                  <MenuItem value="JULIANO">JULIANO</MenuItem>
                  <MenuItem value="MATHEUS">MATHEUS</MenuItem>
                  <MenuItem value="VANDERLEI">VANDERLEI</MenuItem>
                  <MenuItem value="VILNEI">VILNEI</MenuItem>
                  <MenuItem value="WILLIAM">WILLIAM</MenuItem>
                  <MenuItem value="PAULO ALEXANDRE">PAULO ALEXANDRE</MenuItem>
                  <MenuItem value="OUTROS">OUTROS</MenuItem>
              </Select>
              <br/><br/>
              <Button type="submit" variant="contained">Enviar</Button>
          </form>
    </div>
  )
}

export default retorno