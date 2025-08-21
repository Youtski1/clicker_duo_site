"use client"

import React, { useState, useEffect, useRef } from 'react';
import "@/styles/clicker.css";


function Pero(props: any){
  let [peroX, setPeroX] = useState(Math.floor(Math.random() * 100))
  let [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true)
    const timer = setTimeout(() => {setAnimation(false)},4000)
    return () => {clearTimeout(timer)}
  })

  if (!animation){
    return
  }

  return (
    <div 
    style={{
      left: `${peroX}vw`,
      top: 0
    }}
    className="pero">
    </div>
  )
}


export default Pero;
