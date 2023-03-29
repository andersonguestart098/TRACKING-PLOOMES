import { AppBar, Button, IconButton, Toolbar, Typography, Avatar, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { signOut } from 'next-auth/react'
import React from 'react'
import style from "@styles/button.module.css"

interface Props {
  dados: any,
  setSearch: React.Dispatch<React.SetStateAction<boolean>>
  setSearchString: React.Dispatch<React.SetStateAction<string>>
  setor: string
}

const Index = (props: Props) => {

  const [stringSearch, setStringSearch] = React.useState("")

  const {setor, dados, setSearch, setSearchString} = props
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                setStringSearch(event.target.value)
            }}
            sx={{ flexGrow: 1, mx: 5 }}
            placeholder="Pesquisar por Nota Fiscal..."
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            type="number"
            size="small"
          />
          <IconButton onClick={() => { 
            setSearchString(stringSearch)
            setSearch(true) 
          }}>
            <SearchIcon className={style.icon} />
          </IconButton>
          <IconButton onClick={() => {}} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={dados.user.image} />
          </IconButton>
          <Button color="inherit" onClick={() => signOut()}>Sair</Button>
        </Toolbar>
      </AppBar>      
  )
}

export default Index