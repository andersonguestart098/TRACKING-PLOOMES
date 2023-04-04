import { Alert, Box, Button, Modal, TextField } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { sendThisToDatabase } from '@services/sendData';
import { ModelAssinatura } from '@models/setoresInterface';
import CustomSelect_Widget from '~/components/customSelect_widget';

type Props = {}


function assinatura({}: Props) {
  const canvasRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [pincelWidth, setPincelWidth] = React.useState(4);
  const [preenchido, setPreenchido] = React.useState(false);
  const [imagemBase64, setImagemBase64] = React.useState("");
  const [disabilitarBotao, setDisabilitarBotao] = React.useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  async function onSubmit(e: any) {
    setDisabilitarBotao(true)
    const data: ModelAssinatura = {
        responsavel: e.responsavel,
        notaFiscal: e.notaFiscal,
        assinatura_img: imagemBase64,
        setor: "assinatura"
    }
    await sendThisToDatabase("/api/methodsdatabase/create", data, 500)
    window.location.reload()
    }

  return (
    <div>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={{display: "flex", alignItems: 'center', justifyContent: "center", height: "100vh"}}>
        <ReactSketchCanvas
            ref={canvasRef}
            width="400px"
            height="400px"
            strokeWidth={pincelWidth}
            strokeColor="#000"
            />
            <div>
                <div style={{marginBottom: 10}}>
                    <Button style={{width: "100%"}} onClick={()=> {
                        let currentValue = pincelWidth
                        currentValue--
                        setPincelWidth(currentValue)
                    }} variant="contained">-</Button>
                    <div style={{
                        width: "100%", height: 30, 
                        background: "#fff", borderRadius: 5,
                        textAlign: "center"
                    }}>{pincelWidth}</div>
                    <Button style={{width: "100%"}} onClick={()=> {
                        let currentValue = pincelWidth
                        currentValue++
                        setPincelWidth(currentValue)
                    }} variant="contained">+</Button>
                </div>
                <Button style={{width: "100%"}} onClick={()=> {
                    canvasRef!.current!.exportImage("png")
                    .then((data: string) => {
                        setImagemBase64(data)
                    })
                    setOpen(false)
                    setPreenchido(true)
                }} variant="contained">Criado</Button>
            </div>
        </Box>
        </Modal>
        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center", alignItems: "center"}}>
        <CustomSelect_Widget
               labelText={'Responsável:'} 
               register={register("responsavel")} 
               itens={[
                {value: "Cristiano S.", visualValue: "Cristiano S."},
                {value: "Cristiano D.", visualValue: "Cristiano D."},
                {value: "Max", visualValue: "Max"},
                {value: "Manoel", visualValue: "Manoel"},
                {value: "Eduardo", visualValue: "Eduardo"},
                {value: "Everton", visualValue: "Everton"},
               ]}  
               />
            <TextField margin='dense' {...register("notaFiscal")} label="Número Nota Fiscal" required />
            <Button onClick={()=> setOpen(true)} variant="outlined">Abrir campo para edição de assinatura</Button>
            {!preenchido ? <Alert sx={{margin: 2}} severity="error">Assinatura ainda não desenhada</Alert> : <></>}
            <Button disabled={disabilitarBotao || !preenchido} type="submit" variant='contained'>Enviar</Button>
        </form>
    </div>
  )
}

export default assinatura