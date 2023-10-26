"use client"

import { useState } from "react";


export default function adddocs(){
 

    const [user, adduser] = useState("");
    const [product, setproduct] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/docs",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user, product})
        })

        adduser("");
        setproduct("");

    }


    return(
        <div>
            <h1>skapa nyt document</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="user" value={user} onChange={(e) => adduser(e.target.value)}/>
                <input type="text" placeholder="product" value={product} onChange={(e) => setproduct(e.target.value)}/>
                <button type="submit">spara</button>
            </form>
        </div>
    )
}