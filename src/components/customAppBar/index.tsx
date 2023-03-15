import { AppBar, Button, IconButton, Toolbar, Typography, Avatar, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { signOut } from 'next-auth/react'
import React from 'react'

interface Props {
  dados: any,
  setData: React.Dispatch<React.SetStateAction<number>>
}

const Index = ({dados, setData}: Props) => {
  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="/home"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {dados.user.name}
          </Typography>
          <TextField
            sx={{ flexGrow: 1, mx: 5 }}
            placeholder="Pesquisar"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
          />
          <IconButton onClick={() => {}} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={dados.user.image} />
          </IconButton>
          <Button color="inherit" onClick={() => signOut()}>Sair</Button>
        </Toolbar>
      </AppBar>      
  )
}

export default Index