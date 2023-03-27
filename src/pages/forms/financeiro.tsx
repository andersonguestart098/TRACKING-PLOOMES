import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import CustomInputMask from '@components/customInputMask'
import CustomSelect_Widget from '@components/customSelect_widget'
import { useForm } from 'react-hook-form'
import CustomRadio from '~/components/customRadio'

type Props = {}

const financeiro = ({}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [widthScreen, setWidthScreen] = useState(0)

  useEffect(() => {
    setWidthScreen(window.innerWidth)
  },[])

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#053C5E"}}>
      <form style={{background: "#F5F5F5", borderRadius: 10, padding: 10}}>
        <h3 style={{textAlign: "center"}}>Formulario Financeiro</h3>
        <hr />
        <div style={widthScreen > 600 ? {display: "flex", flexDirection: "row", 
          justifyContent: "space-between", width: "50%"} : {}}>
            <div style={{margin: 50}}>
              <CustomSelect_Widget
                labelText={'Quem Recebeu:'} 
                register={register("quemRecebeu")} 
                itens={[
                  { value: "BETO", visualValue: "BETO" },
                  { value: "FELIPE", visualValue: "FELIPE" },
                  { value: "ALINE", visualValue: "ALINE" },
                  { value: "CRISTIAN", visualValue: "CRISTIAN" },
                  { value: "FAGUNDES", visualValue: "FAGUNDES" },
                  { value: "MARCIA", visualValue: "MARCIA" },
                  { value: "WAGNER", visualValue: "WAGNER" },
                  { value: "GELSON", visualValue: "GELSON" },
                  { value: "LUIS", visualValue: "LUIS" },
                  { value: "FERNANDO", visualValue: "FERNANDO" },
                  { value: "EDUARDO", visualValue: "EDUARDO" },
                  { value: "SANANDUVA", visualValue: "SANANDUVA" },
                  { value: "EDUARDO", visualValue: "EDUARDO" },
                  { value: "FAVRETTO", visualValue: "FAVRETTO" },
                  { value: "FERNANDA", visualValue: "FERNANDA" },
                  { value: "GASPAR", visualValue: "GASPAR" },
                  { value: "GILIARD", visualValue: "GILIARD" },
                  { value: "GILMAR", visualValue: "GILMAR" },
                  { value: "JONATHAS", visualValue: "JONATHAS" },
                  { value: "KOZAK", visualValue: "KOZAK" },
                  { value: "LEONARDO", visualValue: "LEONARDO" },
                  { value: "SABINO", visualValue: "SABINO" },
                  { value: "ANDREBARBOSA", visualValue: "ANDREBARBOSA" }
                ]}
               /> 
              <br/><br/>
              <TextField sx={{width: 250}} label="Cliente" variant="outlined" required />
              <br/><br/>
              <CustomRadio 
                register={register("tipoFaturamento")} 
                labelText={'Tipo de Faturamento: '} 
                items={[
                  { value: "Normal", visualValue: "Normal" },  
                  { value: "Para Futura Entrega", visualValue: "Para Futura Entrega" }  
                ]} />
            </div>
            <div style={{margin:50}}>
              <TextField sx={{width: 250}} type="number" label="Orcamento" variant="outlined" required />
              <br/><br/>
              <CustomInputMask register={register("valorVenda")} placeHolder='Valor da Venda (incluindo frete)' />
            </div>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button type='submit' sx={{width: "50%"}} variant="contained">Enviar</Button>
        </div>
      </form>
    </div>
  )
}

export default financeiro