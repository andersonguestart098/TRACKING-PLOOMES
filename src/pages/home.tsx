import React, { useCallback } from 'react';
import {AppBar, Avatar, Box, Button, CssBaseline,
    Drawer, IconButton, List, ListItem, ListItemButton, 
    ListItemIcon, ListItemText, Step, StepLabel, Stepper, Toolbar, Typography} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { getSession, useSession } from 'next-auth/react';
import CustomCard from "@components/customCard"

import { AccountTree, Backup, BarChart } from '@mui/icons-material';
import { useFetch } from '@hooks/useFetch';
import Swal from 'sweetalert2';
import Loader from '~/components/loader';
import { GetServerSideProps } from 'next';
import CustomSelect_Widget from '~/components/customSelect_widget';
import { sendThisToDatabase } from '~/services/sendData';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const drawerWidth = 270;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if(!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props:{
      session
    }
  }
}

export default function ResponsiveDrawer(props: any) {
  const {window} = props
  const { data: dataAuth } = useSession()

  const { data, isLoading } = useFetch("/api/methodsdatabase/getall", 0, "home", JSON.stringify(dataAuth))
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
      <div>
      <img src="/logoce (2).svg" 
      style={{
        marginBottom: 15,
        marginTop: 15,
        width: 50
        }} />
      <Box
        sx={{
            width: drawerWidth/1.3,
            height: 70,
            borderRadius: 2,
            backgroundColor: '#dcdee0',
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5
        }}>
            <Avatar sx={{
                children: "D",
                position: "relative",
                marginLeft: 1,
                marginRight: 5
            }} 
            alt={"foto:"+dataAuth?.user?.name} 
            src={String(dataAuth?.user?.image)}
            />
            <p style={{
                fontSize: "1vw"
            }}>
                {dataAuth?.user?.name}
            </p>
        </Box>
      </div>
      </Toolbar>
      <List> 
          <ListItem disablePadding>
          <ListItemButton onClick={() => {
                  Swal.fire({
                    title: 'Tabelas disponiveis',
                    width: 600,
                    padding: '3em',
                    html:
                      'Click nos setores disponiveis abaixo: <br/><br/>'+
                      (data?.setor == "adm" ? 
                      '<a style="color: red" target="_blank" href="/views/cruzamento">TABELA FLUXO DADOS</a><br/><br/>'+
                      '<a style="color: red" target="_blank" href="/views/financeiro">TABELA FINANCEIRO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/expedicao">TABELA EXPEDIÇÃO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/expedicao2">TABELA EXPEDIÇÃO 2</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/logistica">TABELA LOGISTICA</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/saida">TABELA SAIDA</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/confirmacaoEntrega">TABELA CONFIRMAÇÃO ENTREGA</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/retorno">TABELA RETORNO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/canhoto">TABELA CANHOTO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/assinatura">TABELA ASSINATURA</a><br/>'
                      : data?.setor == "financeiro" ?
                      '<a style="color: red" target="_blank" href="/views/cruzamento">TABELA FLUXO DADOS</a><br/><br/>'+
                      '<a style="color: red" target="_blank" href="/views/assinatura">TABELA ASSINATURA</a><br/>'+
                      '<a style="color: red" target="_blank" href="/views/'+data?.setor+'">'+data?.setor.toUpperCase()+'</a>'
                      :'<a style="color: red" target="_blank" href="/views/'+data?.setor+'">'+data?.setor.toUpperCase()+'</a>')
                  })
              }}>
              <ListItemIcon><BackupTableIcon /></ListItemIcon>
              <ListItemText primary="Tabelas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={() => {
                  Swal.fire({
                    title: 'Formularios disponiveis',
                    width: 600,
                    padding: '3em',
                    html:
                      'Click nos setores disponiveis abaixo: <br/><br/>'+
                      (data?.setor == "adm" ? 
                      '<a style="color: red" target="_blank" href="/forms/financeiro">FORMULARIO FINANCEIRO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/saida">FORMULARIO SAIDA</a><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/confirmacaoEntrega">FORMULARIO CONFIRMAÇÃO ENTREGA</a><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/retorno">FORMULARIO RETORNO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/canhoto">FORMULARIO CANHOTO</a><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/assinatura">FORMULARIO ASSINATURA</a><br/>'
                      : data?.setor == "financeiro" ? 
                      '<a style="color: red" target="_blank" href="/forms/'+data?.setor+'">'+data?.setor.toUpperCase()+'</a><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/assinatura">FORMULARIO ASSINATURA</a><br/>'
                      : '<a style="color: red" target="_blank" href="/forms/'+data?.setor+'">'+data?.setor.toUpperCase()+'</a>')
                  })
              }}>
              <ListItemIcon><DesignServicesIcon /></ListItemIcon>
              <ListItemText primary="Formularios" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton href='http://localhost:3000/api/methodsdatabase/excelexport'>
              <ListItemIcon><TableRowsIcon /></ListItemIcon>
              <ListItemText primary="Exportar Excel" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const particlesInit = useCallback(async (engine: any) => {
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
      await console.log(container);
  }, []);

  return (
    data?.result == "não definido" ? 
      <div style={{background: "#080808"}}>
        <img src="/logoce (2).svg" 
      style={{
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 15,
        width: 50
        }} />
        <Particles id="tsparticles" url="http://localhost:3000/api/methodsdatabase/delete" init={particlesInit} loaded={particlesLoaded} />
        <form style={{display: "flex", height: "100vh", alignItems: "center", 
                  justifyContent: 'center', flexDirection: "column"}}>
          <h1 style={{color: "#f7f5f5"}}>BEM - VIND@ </h1>
          <CustomSelect_Widget
            bg='#fff' 
            itens={[
              {value: "expedicao", visualValue: "Expedicao"},
              {value: "expedicao2", visualValue: "Expedicao 2"},
              {value: "logistica", visualValue: "Logistica"},
              {value: "financeiro", visualValue: "Financeiro"},
              {value: "confirmacaoEntrega", visualValue: "Confirmação Entrega"},
              {value: "canhoto", visualValue: "Canhoto"},
              {value: "saida", visualValue: "Carregamento Caminhao"},
              {value: "retorno", visualValue: "Retorno da Entrega"},
            ]} 
            onChangeValue={(e) => {
              sendThisToDatabase("/api/methodsdatabase/editDataWhere", {
                setor: "home",
                email: dataAuth?.user?.email,
                setorEditar: e.target.value
              }, 1)
            }}
            labelText={'Setor'} />
          <br />
        </form>
      </div>
    : <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backdropFilter:"blur(20px)",
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {data?.setor?.toUpperCase() == "ADM" ? "ADMINISTRADOR" : data?.setor?.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <h2>Olá novamente, {dataAuth?.user?.name}</h2>
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between"
        }}>
          {data?.result[0] != "N/D" ?
            <CustomCard icon={
                <ClearIcon sx={{fontSize: 70, color: "#eb1c15"}} />
            } 
              valor={data?.result[0]}
              titulo="Pendente"
            /> : <></>}

            {data?.result[0] != "N/D" ?
              <CustomCard icon={
                  <CheckCircleOutlineIcon sx={{fontSize: 70, color: "#5ad43b"}} />
              }
                valor={data?.result[1]} 
                titulo="Concluído" 
              /> : <></>}
              
              
            <CustomCard icon={
                <BarChart sx={{fontSize: 70, color: "#45b4f5"}} />
            }
              valor={data?.result[2]} 
              titulo="Total" 
            />
        </div>
      </Box>
    </Box>
  );
}