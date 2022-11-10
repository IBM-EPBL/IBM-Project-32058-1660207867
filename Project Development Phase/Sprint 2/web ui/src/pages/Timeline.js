import React from 'react'
import SecondNav from '../components/SecondNav'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Box, Drawer, Typography } from '@mui/material';
import TLbg from '../images/tlbg.png'
export default function TimeLine({isTLDrawerOpen,setTLDrawerOpen,tdata}) {

  return (
    <Drawer anchor='top' open={isTLDrawerOpen} onClose={()=>setTLDrawerOpen(false)} PaperProps={{ style: { height: "100vh",background:"#FFF8FF" } }}>
      <SecondNav title={"Timeline"} setTLDrawerOpen={setTLDrawerOpen}/>
      <Timeline position="alternate">
        {tdata.length === 0 ? (
          <Box sx={{display:"flex",flexDirection: "column",alignItems: "center",width: "100%",height: "100vh"}}>
            <Box component="img" src={TLbg} alt="nothing" width="350px" loading='lazy'></Box>
          <Typography >No Medicines Added 💊</Typography>
          </Box>
          ):(tdata.map(items=>
        <TimelineItem key={items.id}>
          <TimelineOppositeContent color="text.secondary">
          {items.createAt.toDate().toDateString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color='primary'/>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{items.title}</TimelineContent>
        </TimelineItem>
          ))}
      </Timeline>
    </Drawer>
  )
}
