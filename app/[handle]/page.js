import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({params}) {
  const handle = (await params).handle
   const client = await clientPromise;
  const db = client.db("bittree")
  const collection = db.collection("links")
  const item = await collection.findOne({handle: handle})
  if(!item){
    return notFound()
  }

  const item2 = {
        "_id": {
            "$oid":"68443cf956a10f043430a93b"
        },
        "links": [
            {
                "link": "https://github.com/Gunjan10-droid",
                "linktext": "GitHub"
            },
            {
                "link": "https://www.linkedin.com/in/gunjan-agrawal-64252a329/",
                "linktext": "Linkedin"
            },
            {
                "link": "https://discord.com/channels/@me/1380590536196620318",
                "linktext": "Discord"
            }
        ],
  "handle": "gunjan",
  "pic": "https://avatars.githubusercontent.com/u/142145209?v=4"
      }
  return <div className="flex min-h-screen bg-purple-400 justify-center items-start gap-4 py-10">
      {item && <div className="photo flex justify-center items-center flex-col">
        <img className="rounded-full w-30 h-30" src={item.pic} alt="" />
        <span className="font-bold text-xl">@{item.handle}</span>
        <span className="desc w-80 text-center">{item.desc}</span>
        <div className="link">
          {item.links.map((item, index)=>{
            return <Link key={index} href={item.link}><div className="py-4 px-2 bg-purple-500 shadow-lg flex justify-center min-w-80 rounded:md my-3">
            {item.linktext}
            
            </div></Link>
          })}
        </div>
        </div>}
  </div>
}
