import { Box, Card, CardContent, CardActionArea } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import React from 'react'

interface Props {
  icon: JSX.Element
  valor: string | number
  titulo: string
}

const Index = ({icon, valor, titulo}: Props) => {
  const heightCard = 150
  return (
    <Box sx={{ minWidth: 250, minHeight: heightCard }}>
        <Card variant="elevation" sx={{minHeight: heightCard, boxShadow: '1px 2px 9px #949492'}}>
          <CardActionArea sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 5}}>
            {icon}
          </CardActionArea>
            <CardContent sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: heightCard}}>
              <h1>{titulo}</h1>
              <h3>{valor}</h3>
            </CardContent>
        </Card>
    </Box>
  )
}

export default Index