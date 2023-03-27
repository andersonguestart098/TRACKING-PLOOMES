import React from 'react'
import CurrencyInput from 'react-currency-input-field'

interface Props {
    placeHolder?: string 
    register?: any
}

const CustomInputMask = ({placeHolder, register}: Props) => {
  return (
    <CurrencyInput
        {...register}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        placeholder={placeHolder ?? ""}
        decimalsLimit={2}
        style={{padding: 15, width: 250, borderRadius: 5, 
        borderColor: "#9e9d9d", 
        borderStyle: 'solid', borderWidth: 1}}
        required
    />
  )
}

export default CustomInputMask