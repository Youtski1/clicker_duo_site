'use client'

import { useState } from "react"
import React from "react"
import Pero from "./Pero"
import { useRef,useCallback, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'; 
import { useTelegramContext } from "@/contexts/TelegramContext"
import { useDuoContext } from "@/contexts/DuoContext"
import { screamings_phrases, recovery_phrases }from "@/phrases"


function Clicker() {
  const duoData  = useDuoContext();
  const [stage, setStage] = useState<number>();
  const [feathers, setFeathers] = useState<string[]>([]); 
  const [screaming, setScreaming] = useState("")
  const timerRefs = useRef<NodeJS.Timeout[]>([]);
  const {user, themeParams, isReady, initData} = useTelegramContext()


  useEffect(() => {
    if (duoData){
      setStage(duoData.duoData.stage)
    }
  },[duoData])
  
  const newScreeming = () => {
    if (duoData?.duoData.health != 0) {
      const screamingss = screamings_phrases[stage!-1]
      setScreaming(`${user?.first_name} ${screamingss[Math.floor(Math.random() * screamingss.length)]}`)
    }
    else {
      setScreaming(`${user?.first_name} ${recovery_phrases[Math.floor(Math.random() * recovery_phrases.length)]}`)
    }
    
  }

  const createPero = useCallback(() => {
    const peroId = uuidv4(); 
    setFeathers(prevFeathers => [...prevFeathers, peroId]); 

    const timer = setTimeout(() => {
      setFeathers(prevFeathers => prevFeathers.filter(id => id !== peroId)); 
    }, 3000);

    timerRefs.current.push(timer);
  }, []);



  const click = () => {
    if (duoData){
      duoData.setHealth(duoData.duoData.health - 1)
    }
  }

  const buttonClick = useCallback(() => {
    newScreeming();
    click();
    if (duoData?.duoData.health != 0) {
      createPero();
    }
  }, [createPero, newScreeming, click]);

  useEffect(() => {
    return () => {
      timerRefs.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <div className="feathers">
        {feathers.length !== 0 && feathers.map((peroId, index) => (
          <Pero key={peroId} id={peroId} /> 
        ))}
      </div>

      <div className="screaming">{screaming}</div>

      <button
        onClick={buttonClick}
        style={{
          backgroundImage: `url(../clicker_image/state_duo_1/${stage}.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="clicker"
      >
      </button>
    </>
  );
}

export default Clicker;

