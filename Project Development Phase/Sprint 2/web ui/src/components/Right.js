import React from 'react'
import profile from '../images/boy.jpeg' 

export default function Right() {
  return (
        <div className="right_container">
      <div className="profile">
        <img src={profile} alt="taki" />
        <span className="your_name">YOUR NAME</span>
        <span className="my_name">Renold Dickson</span>
      </div>
      <div className="info-container">
       <span className="placeholder">username</span>
       <span className="field">@smart18</span>
       <span className="line"></span>
       <span className="placeholder">About</span>
       <span className="field">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur voluptas quidem </span>
       <span className="line"></span>
       <span className="line"></span>
       <span className="placeholder">Goal</span>
       <span className="field">To become a inspiration for many students</span>
      </div>
    </div>
  )
}
