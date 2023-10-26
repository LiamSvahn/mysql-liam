"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";


interface Documents{
    id: number,
    user: string,
    product: string,
    date: string,
  }

  export default function Editdocuments() {

    const [user, adduser] = useState("");
    const [product, setproduct] = useState("");
    const [documentet, setdocumnetet] = useState<Documents | undefined>(undefined);

    const router = useRouter();


    const sercheParams = useSearchParams();
    const documnetid = sercheParams.get("id")
    console.log("docid", documnetid)

    useEffect(() => {
        const getdocs = async () =>{
            const res = await fetch("api/docs/" + documnetid)
            const data = await res.json();
            console.log("vår product", data[0])
            setdocumnetet(data);
        }
        if (documnetid) getdocs();

    }, [documnetid])

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        const res = await fetch("/api/docs/"+ documnetid, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user, product})
        })
        if(res.ok){
            router.push("/")
        }
    } 

    return(
        <div>
            <h1>cahnge</h1>

            {documentet ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder={documentet.user} value={user} onChange={(e) => adduser(e.target.value)}/>
                    <input type="text" placeholder={documentet.product} value={product} onChange={(e) => setproduct(e.target.value)}/>
                    <button type="submit">spara</button>
                </form>

            ) : (
                <div>laddar ...</div>
            )}

        </div>
    )

  }