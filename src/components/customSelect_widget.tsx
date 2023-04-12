import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

interface itensI {
    value: string | number
    visualValue: string
    color?: string
}

interface Props {
    itens: itensI[]
    labelText: string
    register?: any
    onChangeValue?(e: any): void
    bg?: string
}

const CustomSelect_Widget = ({itens, labelText, register, onChangeValue, bg}: Props) => {
  return (
    <FormControl sx={{width: 250, background: bg ?? ""}}>
        <InputLabel id="demo-simple-select-label">{labelText}</InputLabel>
        <Select
            required
            labelId="demo-simple-select-label"
            {...register}
            onChange={(e) => onChangeValue?.(e)}
            id="demo-simple-select"
            label={labelText}
        >
            <MenuItem disabled value=""></MenuItem>
            {itens.map((item: itensI, index: number) => {
                return <MenuItem style={{background: item.color ?? "#ffff"}} key={index} value={item.value}>{item.visualValue}</MenuItem>
            })}
        </Select>
    </FormControl>
  )
}

export default CustomSelect_Widget