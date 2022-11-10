import React ,{useState} from 'react'
import '../styles/App.css'
import { Box } from '@mui/system'
import { AppBar, Button, ButtonGroup, Drawer, IconButton, LinearProgress, Stack, Toolbar, Typography } from '@mui/material'
import { ArrowBack, PhotoCamera } from '@mui/icons-material'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { db,auth } from '../utils/firebase'
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'

export default function Left() {
  const handleClear=()=>{
    document.getElementById("frm").reset()
    setFormData("")
  }
  const [formData,setFormData]=useState(
    {
      title: "",
      dose: "",
      time: "",
    }
  )
  const handleOnChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleOnSubmit=()=>{
      if(!formData.title||!formData.dose||!formData.time){
        alert("Write all required field")
        return;
      }
          const notesRef = collection(db,auth.currentUser.uid);
          addDoc(notesRef,{
            title: formData.title,
            dose: formData.dose,
            time: formData.time,
            createAt: Timestamp.now().toDate()
          })
          
          .catch((err)=>{
            console.log(err)
            toast("Error in submission",{type: "error"});
          })
            setFormData({
              title: "",
              dose: "",
              time: ""
            })
        }
      
  return (
    <Box bgcolor="white" minHeight="100vh" overflow={'hidden'}>
    <AppBar sx={{color:"white",zIndex:"0"}} color="transparent" position="static" elevation="0" >
        <Toolbar sx={{ displey: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'}}>
             <Link to="/">
       <Box sx={{zIndex:"50000"}}>
      <IconButton sx={{position: "absolute",left:"10px",top:"10px"}}>
        <ArrowBack />
      </IconButton>
      </Box>
      </Link>
        </Toolbar>
      </AppBar>
        <ToastContainer/>
        <Box sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>

  <Box 
      id="frm"
      component="form" sx={{
        paddingTop:"50px",
        paddingInline:"80px",
        display: 'flex',
        flexDirection: "column",
        justifyContent:"center",
        minWidth:"100px",
      }}>
        <label>Medicine Name</label>
     <input type="text" className="input" name="title"  value={formData.title} onChange={(e)=>handleOnChange(e)}/>
     <label>Dose</label>
     <input type="text" className="input" name="dose" value={formData.dose} onChange={(e)=>handleOnChange(e)}/>
     <label>Medicine Time</label>
     <input type="time" className="input" name="time" placeholder="Time" value={formData.time} onChange={(e)=>handleOnChange(e)}/>
  <ButtonGroup variant="container" sx={{marginTop:"20px"}}>
      <Button  sx={{backgroundColor: "dodgerblue",'&:hover': {
        backgroundColor: '#d5dfe0',
        color: 'black',
      }}} onClick={handleOnSubmit} >SUBMIT</Button> 
  <Button sx={{backgroundColor: "tomato",color: "white",'&:hover': {
    backgroundColor: 'red',
    color: 'black',
  }}} onClick={handleClear}>CLEAR</Button>
  </ButtonGroup>
  </Box>
  </Box>
  </Box>
  )
}