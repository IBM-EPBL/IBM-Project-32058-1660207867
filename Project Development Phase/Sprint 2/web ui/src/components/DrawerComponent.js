import { Drawer } from '@mui/material'
import React from 'react'

export default function DrawerComponent({Items,isDrawerOpen,setIsDrawerOpen}) {
  return (
    <Drawer anchor='left' open={isDrawerOpen} onClose={()=>setIsDrawerOpen(false)}>
    {Items}
  </Drawer>
  )
}
