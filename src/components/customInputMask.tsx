import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

interface Props {
    placeHolder?: string 
    register?: React.Dispatch<React.SetStateAction<string>>
}

const CustomInputMask = ({placeHolder, register}: Props) => {
  const [valueInput, setValueInput] = useState("");
  let { setValue } = useForm();

  const handleChange = (event: any) => {
    // Remove caracteres não-numéricos
    let inputValue = event.target.value.replace(/[^\d]/g, "");

    // Divide o valor por 100 para obter o valor em centavos
    let numberVal = parseFloat(inputValue) / 100;

    // Formata o valor em moeda BRL
    let formattedVal = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberVal);

    // Atualiza o valor do estado do componente com o valor formatado
    register?.(formattedVal)
    setValueInput(formattedVal);
  };
  return (
    <TextField style={{width:250}} type="text" onChange={handleChange} value={valueInput} label={placeHolder} required />
  )
}

export default CustomInputMask