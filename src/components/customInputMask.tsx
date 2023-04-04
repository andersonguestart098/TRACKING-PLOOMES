import { TextField } from '@mui/material'
import React from 'react'
import { CurrencyInput } from 'react-currency-mask';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
    placeHolder?: string 
    register?: any
}

const CustomInputMask = ({placeHolder, register}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={""}
      control={control}
      render={({ field }) => (
        <CurrencyInput
          value={field.value}
          onChangeValue={(_, value) => {
            field.onChange(value);
          }}
          InputElement={<TextField />}
        />
      )}
    />
  )
}

export default CustomInputMask