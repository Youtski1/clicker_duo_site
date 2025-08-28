'use client'
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

import { useEffect} from "react";


export default function Home() {

useEffect(() => {
  const checkTelegramAndProceed = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram WebApp is available. Proceeding with initialization...");
      const initData = window.Telegram.WebApp.initData || "";
      const telegram_id = window.Telegram.WebApp.initDataUnsafe?.user?.id; 

      if (!telegram_id && !initData) {
        console.warn("telegram_id or initData is missing.  Check your WebApp configuration.");
        return; 
      }

      console.log(`Use effect. Init Data: ${initData}`);

      const handleOpen = async () => {
        try {
          await fetch('/api/save_init_data', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(initData) 
          });

        } catch (error) {
          console.error("Error saving init data:", error); 
    
        }

        const ws = new WebSocket(WS_URL);

        ws.onopen = () => { 
            console.log("WebSocket connection established.");

            setInterval(async () => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(telegram_id?.toString() || "1234567"); 
              } else {
                console.warn("WebSocket connection is not open.  Skipping send.");
              }
            }, 5000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed.");
        }
      };

      handleOpen();
    } else {
      console.warn("Telegram WebApp not available. Trying again...");
      setTimeout(checkTelegramAndProceed, 500); 
    }
  };

  checkTelegramAndProceed(); 
  }, []);

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
