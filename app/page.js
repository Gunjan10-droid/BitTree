"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter()
const [text, setText] = useState("")

  const createTree = () =>{
    router.push(`/generate?handle=${text}`)
  }
  useEffect(() => {
    fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ hello: "world" }),
    });
  }, []);

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[140vh] grid grid-cols-2">
        <div className="flex justify-center items-center flex-col ml-[10vw] gap-4">
          <p className="text-[#d2e823] font-extrabold text-7xl">Everything you are. In one, simple link in bio.</p>
          <p className="text-white text-lg font-semibold">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
        <div className="input flex gap-2 -ml-[12vw]">
          <input value={text} onChange={(e)=> setText(e.target.value)} className="px-2 py-2 focus:outline-green-800 bg-white rounded-md" type="text" placeholder="Enter your handle"/>
          <button onClick={()=> createTree()} className="bg-[#e9c0e9] rounded-full px-4 py-4 font-semibold">Claim your Bittree</button>
        </div>
        </div>
        <div className="flex justify-center items-center flex-col mr-[10vw]">
          <img src="/home.png" alt="homepage image"/>
        </div>
      </section>
      <section className="bg-[#780016] min-h-screen grid grid-cols-2">
        <div className="flex justify-center items-center flex-col ml-[10vw] gap-4">
          <p className="text-[#e9c0e9] font-extrabold text-5xl">Share your Linktree from your Instagram, TikTok, Twitter and other bios.</p>
          <p className="text-white text-lg font-semibold">Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>
        <div className="input flex gap-2 -ml-[22vw]">
          <button onClick={()=> createTree()} className="bg-[#e9c0e9] rounded-full p-5 px-15 font-semibold">Get started for free</button>
        </div>
        </div>
        <div className="flex justify-center items-center flex-col mr-[10vw]">
          <img src="/share.png" alt="share image"/>
        </div>
      </section>
    </main>
  );
}
