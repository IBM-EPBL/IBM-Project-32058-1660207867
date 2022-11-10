import React from 'react'
import {Box} from '@mui/material'
export default function LeftBar({Items}) {
  return (
    <Box flex={1} sx={{background: "white",minWidth:"20%",minHeight: "100vh", boxShadow: 5,display: { xs: 'none', sm: 'none',md:"block" } ,left: 0}}>
    <Box sx={{position: "fixed",minHeight:"100vh"}} >
    {Items}
    </Box>
    </Box>
  )
}
