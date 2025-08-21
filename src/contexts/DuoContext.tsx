"use client"

import { useContext, useEffect, useState, createContext, useRef } from "react";
import { fakeTelegram } from "@/mocks/telegram_context_mock";
import { Duo } from "@/app/types/duo";
import { Cabin_Sketch } from "next/font/google";

interface DuoData {
    id: number,
    owner_id: number,
    level: number,
    stage: number,
    health: number,
    recovery_time: string
}

type DuoDataContext = {
    duoData: DuoData | null
    full_health: number | null,
    setHealth: ((newHealth: number) => void) | null,
    isReady: boolean
}

interface DataContext {
    duoData: DuoData,
    full_health: number,
    setHealth: (newHealth: number) => void,
    isReady: boolean
}

const DuoDataContext = createContext<null | DataContext>(null)


interface Props {
  children: React.ReactNode;
}

export const DuoDataProvaider: React.FC<Props> = ({ children }) => {

    const [duoData, setDuoData] = useState<DuoDataContext>({
        duoData: null,
        full_health: null,
        setHealth: null,
        isReady: false
    }) 
    const [updateDuo, setUpdateDuo] = useState(false);
    const countClick = useRef(0);
    let status_click = true
    let data;

    const setHealth = (newHealth: number) => {
        setDuoData(prevDuoData => {
        let updatedDuoData = {...prevDuoData}

        if (!prevDuoData.duoData || !prevDuoData.full_health) {
            return updatedDuoData
        }

        if (prevDuoData.duoData.health == 0){
            status_click = false
            return updatedDuoData
        }

        const percentage = Math.round(prevDuoData.duoData.health) / (prevDuoData.full_health / 100);

        if ((countClick.current == 40 || percentage == 0)) {
            countClick.current = 0;
            setUpdateDuo(true)
        }
        else {
            updatedDuoData = {...prevDuoData, duoData: {...prevDuoData.duoData, health: newHealth}}
        }


        return updatedDuoData
        })

        if (status_click){
            countClick.current += 1
        }
    }


    useEffect(() => {
        const damageDuo = async () => {
            await fetch("/api/damage_duo", {
                method: 'POST',
                body: JSON.stringify({
                telegram_id: window.Telegram?.WebApp.initDataUnsafe.user?.id
                })
            });

            const getDuoData = async () => {
                const owner_id = window.Telegram?.WebApp.initDataUnsafe.user?.id;
                const res = await fetch(`/api/get_duo_data/${owner_id}`);

                if (res.status === 200) {
                    const data = await res.json();
                    const duo: Duo = data.duo;

                    setDuoData(prev => ({
                        ...prev,
                        duoData: duo,
                    }));

                    console.log("Duo data updated after damage");
                } 
                else {
                    console.log("Failed to fetch duo data");
                }

            }

            getDuoData();
        };
        
        if (updateDuo) {
            console.log("Update duo data")
            setUpdateDuo(false);
            damageDuo();
        }
    }, [updateDuo])

    useEffect(() => {
        const getDuoData = async () => {
            const owner_id = window.Telegram?.WebApp.initDataUnsafe.user?.id

            const res = await fetch(`/api/get_duo_data/${owner_id}`)
            
            if (res.status == 200) {
                const data = await res.json();
                const duo: Duo = data.duo;
                const full_health = 850 + 350 * duo.level;
                setDuoData({duoData: duo, setHealth: setHealth, full_health: full_health, isReady: true});
                console.log("Duo data received" + duo.level)
            }
            else
                console.log("Not duo data");
        }

        getDuoData();
    
    }, [])
    
    if (duoData.duoData && duoData.full_health && duoData.setHealth){
        data = {
            duoData: duoData.duoData,
            full_health: duoData.full_health,
            setHealth: duoData.setHealth,
            isReady: duoData.isReady
        }

    }
    else {
        data = null
    }
    

    return (
        <DuoDataContext.Provider value ={ data }>
            {children}
        </DuoDataContext.Provider>
    )
}

export const useDuoContext = () => useContext(DuoDataContext)