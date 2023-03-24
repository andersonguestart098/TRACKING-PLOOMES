import { Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
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
              
              <InputLabel htmlFor="conferente" id="conferente">conferente</InputLabel>
              <Select
                required
                {...register("conferente")}
                labelId="conferente"
                id="conferente"
                label="conferente"
                sx={{width: 250}}
              >
                <MenuItem disabled value=" "></MenuItem>
                <MenuItem value="Max">Max</MenuItem>
                <MenuItem value="Dudu">Dudu</MenuItem>
                <MenuItem value="Cristiano">Cristiano</MenuItem>
                <MenuItem value="Matheus">Matheus</MenuItem>
                <MenuItem value="Manoel">Manoel</MenuItem>
              </Select>
              <br/><br/>
              <InputLabel id="placa">Placa:</InputLabel>
                <Select
                  required
                  {...register("placa")}
                  labelId="placa"
                  id="demo-simple-select"
                  label="placa"
                  sx={{width: 250}}
                >
                  <MenuItem disabled value=" "></MenuItem>
                  <MenuItem value="IYW-7921">IYW7921</MenuItem>
                  <MenuItem value="IWC5261">IWC5261</MenuItem>
                  <MenuItem value="JBD-7E59">JBD7E59</MenuItem>
                  <MenuItem value="IZT1E84">IZT1E84</MenuItem>
                  <MenuItem value="IWW7921">IWW7921</MenuItem>
                  <MenuItem value="IVO1603">IVO1603</MenuItem>
                  <MenuItem value="AZI2E30">AZI2E30</MenuItem>
                  <MenuItem value="ITA7784">ITA7784</MenuItem>
                  <MenuItem value="IUT9476">IUT9476</MenuItem>
                  <MenuItem value="IST6840">IST6840</MenuItem>
                  <MenuItem value="IVP0G05">IVP0G05</MenuItem>
                  <MenuItem value="JBD9H36">JBD9H36</MenuItem>
                  <MenuItem value="IXH8706">IXH8706</MenuItem>
              </Select>
              <br/><br/>

                <Select
                  required
                  {...register("motorista")}
                  labelId="motorista"
                  id="demo-simple-select"
                  label="motorista"
                  sx={{width: 250}}
                >
                  <MenuItem disabled value=" "></MenuItem>
                  <MenuItem value="ALEXANDRE">ALEXANDRE</MenuItem>
                  <MenuItem value="DIONATHA">DIONATHA</MenuItem>
                  <MenuItem value="DOUGLAS">DOUGLAS</MenuItem>
                  <MenuItem value="IGON">IGON</MenuItem>
                  <MenuItem value="JULIANO">JULIANO</MenuItem>
                  <MenuItem value="MATHEUS">MATHEUS</MenuItem>
                  <MenuItem value="PAULO">PAULO</MenuItem>
                  <MenuItem value="VANDERLEI">VANDERLEI</MenuItem>
                  <MenuItem value="VILNEI">VILNEI</MenuItem>
                  <MenuItem value="MAX">MAX</MenuItem>
                  <MenuItem value="PAULO VITOR">PAULO VITOR</MenuItem>
                  <MenuItem value="CRISTIANO">CRISTIANO</MenuItem>
                  <MenuItem value="WILLIAM">WILLIAM</MenuItem>
                  <MenuItem value="PAULO ALEXANDRE">PAULO ALEXANDRE</MenuItem>
              </Select>
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
                  type="number" required 
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