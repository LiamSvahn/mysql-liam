"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Documents{
  id: number,
  user: string,
  product: string,
  date: string,
}
export default function Home() {
  const [documents, setDocuments] = useState([])

  const router = useRouter();

  useEffect(() =>{
    const getdocs = async () =>{
      const res = await fetch("/api/docs")
      const documents = await res.json();
      console.log("hääär", documents)
      setDocuments(documents);
    }
    getdocs()
  }, [])

  const handleEdit = (docs: Documents) => {
    router.push("/edit-docs/?id=" + docs.id);

  }
  const handleDelet = async (docs: Documents) => {
    const res = await fetch("/api/docs/" + docs.id, {
      method: "DELETE"
    })

    if(res.ok){
      setDocuments(documents.filter((keep: Documents) => keep.id != docs.id))
    }
  }

  return (

    <div>
      <ul>
      {documents.map((docs: Documents) => (
        <li key={docs.id}> {docs.user} - {docs.product} - {docs.date} (<button onClick={(e) => handleEdit(docs)}>Edit</button><button onClick={(e) => handleDelet(docs)}>Delet</button>)</li>
      ))}
      </ul>
    </div>
  )
}
