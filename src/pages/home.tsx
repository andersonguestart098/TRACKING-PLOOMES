import * as React from 'react';
import {AppBar, Avatar, Box, CssBaseline,
    Drawer, IconButton, List, ListItem, ListItemButton, 
    ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useSession } from 'next-auth/react';
import CustomCard from "@components/customCard"

import { AccountTree, Backup, BarChart } from '@mui/icons-material';
import { useFetch } from '@hooks/useFetch';
import Swal from 'sweetalert2';


const drawerWidth = 270;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer({window}: Props) {
  const { data, isLoading } = useFetch("/api/methodsdatabase/getall", 0, "home")
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: dataAuth } = useSession()

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
                    title: 'Setores disponiveis',
                    width: 600,
                    padding: '3em',
                    html:
                      'Click nos setores disponiveis abaixo: <br/><br/>'+
                      '<a style="color: red" target="_blank" href="/views/expedicao">Expedicao</a>'
                  })
              }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={() => {
                  Swal.fire({
                    title: 'Setores disponiveis',
                    width: 600,
                    padding: '3em',
                    html:
                      'Click nos setores disponiveis abaixo: <br/><br/>'+
                      '<a style="color: red" target="_blank" href="/views/expedicao">Expedicao</a>'
                  })
              }}>
              <ListItemIcon><BackupTableIcon /></ListItemIcon>
              <ListItemText primary="Tabelas" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
          <ListItemButton onClick={() => {
                  Swal.fire({
                    title: 'Setores disponiveis',
                    width: 600,
                    padding: '3em',
                    html:
                      'Click nos setores disponiveis abaixo: <br/><br/>'+
                      '<a style="color: red" target="_blank" href="/forms/expedicao">Expedicao</a>'
                  })
              }}>
              <ListItemIcon><DesignServicesIcon /></ListItemIcon>
              <ListItemText primary="Formularios" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  
  if(dataAuth?.user?.setor == undefined) {
    return (
      <p>Tela Apresentação</p>
    )
  }


  return (
    <Box sx={{ display: 'flex' }}>
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
            EXPEDICAO
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
        <h2>Ola novamente, {dataAuth?.user?.name}</h2>
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between"
        }}>
            <CustomCard icon={
                <AccountTree sx={{fontSize: 50}} />
            } 
              valor={data?.result[0]}
              titulo="Pendente"  
            />
            <CustomCard icon={
                <Backup sx={{fontSize: 50}} />
            }
              valor={data?.result[1]} 
              titulo="Emitida" 
            />
            <CustomCard icon={
                <BarChart sx={{fontSize: 50}} />
            }
              valor={data?.result[2]} 
              titulo="Total" 
            />
        </div>
      </Box>
    </Box>
  );
}