import React from 'react';
import { makeStyles } from '@mui/styles';
import {Grid, Card, CardMedia, Typography,CardContent, CardActions, Button, Box, Stack, Divider, Paper} from '@mui/material'
import { useState, useEffect } from 'react'
import {collection,orderBy,query,onSnapshot,deleteDoc,doc} from 'firebase/firestore'
import { db,auth,storage,logout } from '../utils/firebase'
import Navbar from '../components/Navbar'
import Add from '../components/Add'
import {  List, ListItem, ListItemButton, ListItemIcon,ListItemText,DialogTitle,DialogContent,DialogContentText,DialogActions,Dialog } from '@mui/material';
import { ToastContainer,toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { Logout,Timeline,Home } from '@mui/icons-material';
import DrawerComponent from '../components/DrawerComponent';
import LeftBar from '../components/LeftBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TimeLine from './Timeline';


const useStyles = makeStyles((theme) => ({
      Card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      CardMedia: {
        padding: '26.25%'
      },
    CardContent: {
      flexGrow: 1
    },
    title: {
      fontFamily: 'Source Sans Pro',
      color: 'CaptionText',
      textTransform:"capitalize"
    },
    FeaturesContainer: {
        height: '100vh',
        background: 'pink'
      }
}));
export default function Main(){
const classes = useStyles();
const [isTLDrawerOpen,setTLDrawerOpen]=useState(false)
const [isALDrawerOpen,setALDrawerOpen]=useState(false)
const [data,setData]=useState([])
const [notes,setNotes]=useState([])
const [isDrawerOpen,setIsDrawerOpen] = useState(false)
const [open, setOpen] = useState(false);
const theme = useTheme();
const handleDelete=async(id)=>{
  if (window.confirm('Are you sure you wish to delete this item?')){
  try {
    await deleteDoc(doc(db,auth.currentUser.uid,id))
    toast("Entry deleted!",{type:"success"})
    }
     catch (e) {
      toast("Error :(",{type:"error"})
      console.log(e);
    }}
  }
  const handleClickOpen = (id) => {
    const res=notes.find((item)=>{
      return item.id===id
    })
    setData(res)
    setOpen(true);
  };
       const handleClose = () => {
    setOpen(false);
  };
  const tdata = notes.reverse()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const Items = (<List>
  <ListItem >
       <ListItemButton>
         <ListItemIcon>
           <Home />
         </ListItemIcon>
         <ListItemText primary="Home " />
       </ListItemButton>
     </ListItem>
     <ListItem  >
       <ListItemButton onClick={()=>setTLDrawerOpen(true)}>
         <ListItemIcon>
           <Timeline />
         </ListItemIcon>
         <ListItemText primary="Timeline" />
       </ListItemButton>
     </ListItem>
     <Divider />
     <ListItem >
       <ListItemButton onClick={logout}>
         <ListItemText primary="Logout" />
         <ListItemIcon>
           <Logout />
         </ListItemIcon>
       </ListItemButton>
     </ListItem>
     </List>)
useEffect(()=>{
        const noteRef = collection(db,auth.currentUser.uid)
        const q= query(noteRef, orderBy("createdAt","title"));
        onSnapshot(q,(snapshot)=>{
            const note = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNotes(note);
            console.log(note)
        })
    },[])
return(
  <Paper>
  <Navbar setIsDrawerOpen={setIsDrawerOpen}/>
  <ToastContainer/>
    <Add />
    <TimeLine  isTLDrawerOpen={isTLDrawerOpen} setTLDrawerOpen={setTLDrawerOpen} tdata={tdata} />
     <Stack direction='row' justifyContent="space-between">
   <LeftBar Items={Items} />
  <DrawerComponent Items={Items} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
<Box flex={10} p={3} component="div" maxWidth="md">
    <Grid  container spacing={4}  >
        {notes.length === 0 ? (
          <Box sx={{display:"flex",flexDirection: "column",alignItems: "center",width: "100%",height: "100vh"}}>
          <Typography sx={{fontSize:"20px",paddingTop:"40px"}}>No Medicines Added 💊</Typography>
          </Box>
          ):(
            notes.slice(0).reverse().map(({id,title,dose,time})=>
            <Grid key={id}  item xs={12} md={4}  sm={6}>
                <Card className={classes.Card}>
                  <CardContent>
                    <Typography gutterBottom variant='h6' sx={{textTransform:"capitalize"}}>{title}</Typography>
                    <Typography className={classes.title}>{dose}</Typography>
                    <Typography className={classes.title}>{time}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>handleClickOpen(id)}>View</Button>
                    <Button onClick={() => handleDelete(id)}>Delete</Button>
                  </CardActions>
                </Card>
               
               </Grid>))}
        </Grid>
        </Box>
        </Stack>
        </Paper>
);
}