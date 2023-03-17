import { AppBar, Button, IconButton, Toolbar, Typography, Avatar, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { signOut } from 'next-auth/react'
import React from 'react'

interface Props {
  dados: any,
  setData: React.Dispatch<React.SetStateAction<number>>
  setor: string
}

const Index = ({setor, dados, setData}: Props) => {
  return (
      <AppBar
      style={{
        background: "#003d4c"
      }}
      position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            style={{
              color: "white"
            }}
            aria-label="menu"
            href="/home"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <div style={{marginTop: 10, marginBottom: 10}}>
            <Typography variant="h5" component="h2">
              {setor}
            </Typography>
            {dados.user.name}
          </div>
          <TextField
            style={{
              background: "white",
              borderRadius: 8,
              margin: 25
            }}
            sx={{ flexGrow: 1, mx: 5 }}
            placeholder="Pesquisar..."
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