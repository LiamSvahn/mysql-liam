"use client"

import './change.css'
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
    const [changeProduct, setChangeProduct] = useState('');
    const [documnetUser, setChangeUser] = useState('');

    const router = useRouter();


    const sercheParams = useSearchParams();
    const documnetid = sercheParams.get("id")
    console.log("docid", documnetid)

    useEffect(() => {
        const getdocs = async () =>{
            const res = await fetch("api/docs/" + documnetid)
            const data = await res.json();
            console.log("vår product", data[0].user)
            console.log("documentet ", documentet)
            setdocumnetet(data);
            setChangeProduct(data[0].product)
            setChangeUser(data[0].user)

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
            <h1 style={{paddingTop: "50px"}}>cahnge</h1>
            <div className="document-container">
                <h2>ditt dokument</h2>
                <h3>User : {documnetUser}</h3>
                <h3>Product : {changeProduct}</h3>
            </div>

            {documentet ? (
                <form onSubmit={handleSubmit}>
                    <h3>User : </h3>
                    <input type="text" placeholder={documentet.user} value={user} onChange={(e) => adduser(e.target.value)}/>
                    <h3>Product : </h3>
                    <input type="text" placeholder={documentet.product} value={product} onChange={(e) => setproduct(e.target.value)}/>
                    <button type="submit">spara</button>
                </form>

            ) : (
                <div>laddar ...</div>
            )}
            

        </div>
    )

  }