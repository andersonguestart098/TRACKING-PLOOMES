import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

interface itensI {
    value: string | number
    visualValue: string
}

interface Props {
    itens: itensI[]
    labelText: string
    register: any
}

const CustomSelect_Widget = ({itens, labelText, register}: Props) => {
  return (
    <FormControl sx={{width: 250}}>
        <InputLabel id="demo-simple-select-label">{labelText}</InputLabel>
        <Select
            required
            labelId="demo-simple-select-label"
            {...register}
            id="demo-simple-select"
            label={labelText}
        >
            <MenuItem disabled value=""></MenuItem>
            {itens.map((item: itensI, index: number) => {
                return <MenuItem key={index} value={item.value}>{item.visualValue}</MenuItem>
            })}
        </Select>
    </FormControl>
  )
}

export default CustomSelect_Widget