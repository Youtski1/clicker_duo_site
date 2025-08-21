"use client"

import { use, useState, useEffect } from "react";
import { useDuoContext } from "@/contexts/DuoContext";


function CounterClick(props: any) {

    const data = useDuoContext();
    let [countClick, setCountClick] = useState(data?.duoData.health)

    useEffect(() => {
        if (data) {
            const percent_health = Math.round(data.duoData.health / (data.full_health / 100));
            console.log(percent_health, data.duoData.health, data.duoData.stage, data.duoData.recovery_time);
            setCountClick(percent_health < 0 ? 0 : percent_health);
        }
    }, [data]);

    return (
        <div className="counter">
            <p className="counter__count">{countClick}%</p>
        </div>
    )
}

export default CounterClick