"use client"
import "@/styles/board_top_users.css"
import "@/styles/global.css"

import React from "react"
import { useState,useEffect } from "react"
import User from "@/components/User"
import { UserTopLevel } from "../types/user_top_level"


const TopUsersPage = () => {
    const [topUsers, setTopUsers] = useState<UserTopLevel[]>([]);

    useEffect(() => {
        const getTopUsers = async () => {
            const res = await fetch("/api/get_top_users");
            console.log(res.status);
            
            if (res.status == 200) {
                const data = await res.json()
                setTopUsers(data.body);
            }
        }
        getTopUsers();
    }, []);

    return (
        <div className="page">
            <div className="container">
                <header className="header">
                    <h1 className="header__title">ТОП ЛУЧШИХ ПО УРОВНЮ</h1>
                </header>
                <main>
                    <section className="top_users">
                        <ol start={1} className="list-users">
                        {topUsers.length > 0 ? (
                            topUsers.map((user) => (
                               <li className="list-users__user" >
                                    <User 
                                    full_name={user.full_name}
                                    level={user.level}
                                    />
                               </li> 
                            ))
                        ): (
                            <p>тут пусто...</p>
                        )}
                        </ol>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default TopUsersPage