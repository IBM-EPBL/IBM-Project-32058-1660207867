import React from 'react'
import {AppBar,Box,Toolbar,IconButton,Typography,Button, Menu, Avatar, MenuItem} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { auth,logout } from '../utils/firebase';

export default function Navbar({setIsDrawerOpen}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }} style={{
    }}>
      <AppBar position="fixed" component="nav" >
        <Toolbar style={{
          displey: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <IconButton 
          sx={{
              color: 'white',
              display: { xs: 'block', sm: 'block',md:"none" }
            }}
            onClick={()=>setIsDrawerOpen(true)}
            >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
           sx={{fontFamily: "source sans pro",fontWeight:"bold"}}
          >
            Torii
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
               <Avatar alt="user" src={auth.currentUser && auth.currentUser.photoURL
                        ? auth.currentUser.photoURL
                        : ""} />
              </IconButton>
              <Menu 
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              keepMounted
              >
                <MenuItem>Logged in as: {auth.currentUser.displayName}</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}