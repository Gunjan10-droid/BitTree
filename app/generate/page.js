"use client"
import { Suspense } from "react";
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

const Generate = () => {

  const searchParams = useSearchParams()

  // const [link, setlink] = useState("")
  // const [linktext, setlinktext] = useState("")
  const [links, setLinks] = useState([{link: "", linktext: ""}])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")

  const handleChange = (index, link, linktext) => { 
    setLinks((initialLinks)=>{
      return initialLinks.map((item, i)=>{
        if (i==index){
          return {link, linktext}
        }
        else {
          return item
        }
      })
    })
   }

   const addLink = () => { 
    setLinks(links.concat([{link: "", linktext: ""}]))
    }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links, 
      "handle": handle,
      "pic": pic,
      "desc": desc
    });

    console.log(raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

   const r = await fetch("http://localhost:3000/api/add", requestOptions)
   const result = await r.json()
   if(result.success){ 
     toast.success(result.message)
     setLinks([])
     setpic("")
     sethandle("")
    }
    else{
      toast.error(result.message)
    }


    }
    return (
        <div className="bg-[#e9c0e9] min-h-[130vh] grid grid-cols-2">
            <div className="col1 flex justify-center items-center flex-col ml-[7vw] text-gray-900">
                <h1 className="font-bold text-3xl">Create your BitTree</h1>
                <div className="flex flex-col gap-5 my-8">
                    <div className="item">
                        <h2 className="font-semibold text-lg">Step 1: Claim your Handle</h2>
                        <div className="mx-3">
                            <input value={handle || ""} onChange={e=>{sethandle(e.target.value)}} className="px-4 py-2 my-2 bg-white focus:outline-[#502274] rounded-full" type="text" placeholder='Choose your handle' />
                        </div>
                    </div>
                    <div className="item">
                        <h2 className="font-semibold text-lg">Step 2: Add Links</h2>
                        {links && links.map((item, index)=>{
                            return <div key={index} className="mx-3">
                            <input value={item.linktext || ""} onChange={e=>{handleChange(index, item.link, e.target.value)}} className="px-4 py-2 mx-1 my-2 bg-white focus:outline-[#502274] rounded-full" type="text" placeholder='Enter link text' />
                            <input value={item.link || ""} onChange={e=>{handleChange(index, e.target.value, item.linktext)}} className="px-4 py-2 mx-1 my-2 bg-white focus:outline-[#502274] rounded-full" type="text" placeholder='Enter link' />
                        </div>})}
                            <button onClick={()=> addLink()} className="p-5 py-2 mx-3 my-2 rounded-3xl text-white font-bold bg-[#502274]">Add Link</button>
                    </div>
                    <div className="item">
                        <h2 className="font-semibold text-lg">Step 3: Add Picture and Description</h2>
                        <div className="mx-3 flex flex-col">
                            <input value={pic || ""} onChange={e=>{setpic(e.target.value)}} className="px-4 py-2 mx-1 my-2 bg-white focus:outline-[#502274] rounded-full" type="text" placeholder='Enter link of your picture' />
                            <input value={desc || ""} onChange={e=>{setdesc(e.target.value)}} className="px-4 py-2 mx-1 my-2 bg-white focus:outline-[#502274] rounded-full" type="text" placeholder='Enter description' />
                            {/* <button disabled = {pic == "" || handle == "" || links[0].linktext == ""} onClick{()=>{submitLinks()}} className="p-5 py-2 mx-1 rounded-3xl my-5 w-fit text-white font-bold disabled:bg-purple-400 bg-[#502274]">Create BitTree</button> */}
                        <button disabled={pic == "" || handle=="" || links[0].linktext == ""} onClick={()=>{submitLinks()}} className='disabled:bg-purple-400 p-5 py-2 mx-1 w-fit my-5 bg-[#502274] text-white font-bold rounded-3xl'>Create your BitTree</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col2 w-full h-screen">
                <img className="h-full object-contain ml-[10vw]" src="/generate.png" alt="Generate your links" />
            </div>
            <ToastContainer />
        </div>
    );

};
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate />
    </Suspense>
  );
}
