import { Box, Card, CardContent, CardActionArea } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import React from 'react'

interface Props {
  icon: JSX.Element
}

const Index = ({icon}: Props) => {
  const heightCard = 150
  return (
    <Box sx={{ minWidth: 250, minHeight: heightCard }}>
        <Card variant="elevation" sx={{minHeight: heightCard, boxShadow: '1px 2px 9px #949492'}}>
          <CardActionArea sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          {icon}
          </CardActionArea>
            <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: heightCard}}>
              OK
            </CardContent>
        </Card>
    </Box>
  )
}

export default Index