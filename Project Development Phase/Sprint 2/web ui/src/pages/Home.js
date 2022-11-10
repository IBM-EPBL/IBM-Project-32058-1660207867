import React from 'react';
import '../styles/star.css'
import { Box, Typography,Button, Fade } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { auth, singInWithGoogle, logout } from "../utils/firebase"
import Main from '../pages/Main';
import Pill1 from '../images/pill1.png';
import Pill2 from '../images/pill2.png';

export default function Home(){
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const[checked,setChecked] = useState(false)
    useEffect(()=>{
        setChecked(true)
    },[])
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // user logged in
            // console.log(authUser);
            setUser(authUser);
    
            if (authUser.displayName) {
              // if they already have a username, don't do anything
            } else {
              // if they don't have a firebase displayName, set it to their username
              return authUser.updateProfile({
                displayName: username,
              });
            }
          } else {
            // user logged out
            setUser(null);
          }
        });
        return () => {
          // cleanup the listener
          unsubscribe();
        };
      }, [username, user]);
return(
  <div>
  {auth.currentUser ? (
    <Main />
    ):(
<div className="starContainer">
<Box sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end",paddingInline:"50px"}}>
  <img src={Pill1} alt="pill1" height="100px"/>
  <img src={Pill2} alt="pill1" height="100px"/>
</Box>
<Box>
    <Fade in={checked} {...(checked?{timeout:3000}:{})} collapsedHeight={50}>
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <Typography sx={{fontSize:"2rem",color:"black",textAlign:"center"}}>Pill<span className='diary-text'> Remainder</span> </Typography>
        <Button startIcon={<FcGoogle />} onClick={user ? logout : singInWithGoogle} variant="contained" sx={{background:"white",color:"black",marginTop:"30px"}}>
        {auth.currentUser && auth.currentUser.displayName ? (
                <span>Logout</span>
              ) : (
                <span>Sign in with Google</span>
              )}
        </Button>
    </Box>
    </Fade>
    </Box>
</div>)}
</div>
);
}