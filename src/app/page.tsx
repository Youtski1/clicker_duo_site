'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import "@/styles/global.css"
import "@/styles/header.css"
import "@/styles/clicker.css"
import "@/styles/fonts.css"
import "@/styles/board_top_users.css"


import Clicker from "@/components/Clicker";
import CounterClick from "@/components/CounterClick";
import { TelegramDataProvider, useTelegramContext } from "@/contexts/TelegramContext";
import { DuoDataProvaider } from "@/contexts/DuoContext";
import { useDuoContext } from "@/contexts/DuoContext";
import { WS_URL } from "@/config";

import { useEffect, useState } from "react";


export default function Home() {
  const duoData = useDuoContext();
  const telegramData = useTelegramContext();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initData = window.Telegram?.WebApp.initData || ""
    const telegram_id = window.Telegram?.WebApp.initDataUnsafe.user?.id

    if (!telegram_id || !initData){
      return
    }

    console.log(`Use effect. Init Data: ${initData} `)
    const handleOpen = async () => {

      const res = await fetch('/api/save_init_data',{
        method: "POST",
        body: JSON.stringify(initData)
      })

      const ws = new WebSocket(WS_URL)

      const intrvalId = setInterval(async () => {
        ws.send(telegram_id?.toString())
      }, 5000)
      
    } 
    handleOpen()
  },[])

  return (
    
    <TelegramDataProvider>
      <DuoDataProvaider>
        <div className="page">
          <div className="container">
            <header>
              <h1>БЕЙ БЕЙ БЕЙ</h1>
            </header>
            <main>
              <section className="clicker_box">
                <CounterClick />
                <Clicker />
              </section>
              <section className="board_btn_link">
                  <Link className="btn_top_users" href={"/top_users"}></Link>
              </section>
            </main>
          </div>
        </div >
      </DuoDataProvaider>
    </TelegramDataProvider>
  );
}
