import { Alert, Box, Button, Modal, TextField } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { sendThisToDatabase } from '@services/sendData';
import { ModelAssinatura } from '@models/setoresInterface';

type Props = {}


function assinatura({}: Props) {
  const canvasRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [pincelWidth, setPincelWidth] = React.useState(4);
  const [preenchido, setPreenchido] = React.useState(false);
  const [imagemBase64, setImagemBase64] = React.useState("");

  const { register, handleSubmit, formState: { errors } } = useForm()

  async function onSubmit(e: any) {
    const data: ModelAssinatura = {
        responsavel: e.responsavel,
        cliente: e.cliente,
        assinatura_img: imagemBase64,
        setor: "assinatura"
    }
    await sendThisToDatabase("/api/methodsdatabase/create", data)
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
            <TextField margin='dense' {...register("responsavel")} label="Responsavel" required />
            <TextField margin='dense' {...register("cliente")} label="Para" required />
            <Button onClick={()=> setOpen(true)} variant="outlined">Abrir campo para edição de assinatura</Button>
            {!preenchido ? <Alert sx={{margin: 2}} severity="error">Assinatura ainda não desenhada</Alert> : <></>}
            <Button type="submit" variant='outlined'>Enviar</Button>
        </form>
    </div>
  )
}

export default assinatura