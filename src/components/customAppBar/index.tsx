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
  setValueInputChange: React.Dispatch<React.SetStateAction<string>>
  setor: string
  filter: string
  searchString: string
  filterData: any[]
}

const Index = (props: Props) => {

  const [stringSearch, setStringSearch] = React.useState("")

  const {setValueInputChange, setor, dados, setSearch, setSearchString, filter, searchString, filterData} = props
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
          <form
          style={{width: "98%"}}
          onSubmit={(e) => {
            e.preventDefault()
            setSearchString(stringSearch)
            setSearch(true) 
          }}>
          <TextField
            style={{
              width: "98%",
              background: "white",
              borderRadius: 8,
              margin: 25
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                  console.log(event.target.value)
                  console.log(filter);
                  setValueInputChange(event.target.value)
                  let json = JSON.parse(searchString)
                  
                  for(let i in filterData[0]) {
                    if(filter == filterData[0][i]) {
                      json = filterData[1][i]
                    }
                  }
                  if (filter == "notaFiscal") {
                    json = {
                      author: {
                        notaFiscal: Number(event.target.value)
                      }
                    }
                  }else if (filter == "notaFiscalP") {
                    json = {
                      notaFiscal: Number(event.target.value)
                    }
                  }
                let text = JSON.stringify(json)
                setStringSearch(text)
            }}
            sx={{ flexGrow: 1, mx: 5 }}
            placeholder={"Pesquisar por "+filter+"..."}
            hiddenLabel
            id="filled-hidden-label-small"
            variant="filled"
            type={filter.includes("notaFiscal") ? "number" : filter.includes("dataCriacao") ? "date" : "text"}
            size="small"
          />
          </form>
          <IconButton 
          onClick={() => {
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