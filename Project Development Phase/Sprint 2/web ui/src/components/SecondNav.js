import { ArrowBack } from '@mui/icons-material'
import { AppBar, Typography, Toolbar, IconButton } from '@mui/material'
import React from 'react'

export default function SecondNav({title,setTLDrawerOpen,setALDrawerOpen}) {
const changeDrawerState=()=>{
  if(title==="Album"){
    setALDrawerOpen(false)
  }
  else{
    setTLDrawerOpen(false)
  }
}
  return (
    <>
    <AppBar>
        <Toolbar>
            <IconButton onClick={changeDrawerState}>
                <ArrowBack />
            </IconButton>
        <Typography>{title}</Typography>
        </Toolbar>
    </AppBar>
    <Toolbar />
    </>
  )
}
