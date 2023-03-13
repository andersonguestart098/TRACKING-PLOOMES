import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    setValue(value: boolean): void
}

const Index = ({setValue}: Props) => {
  return (
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    onChange={(event: SelectChangeEvent) => setValue(JSON.parse(event.target.value))}
  >
    <MenuItem value={"true"}>Sim</MenuItem>
    <MenuItem value={"false"}>Não</MenuItem>
  </Select>
  )
}

export default Index