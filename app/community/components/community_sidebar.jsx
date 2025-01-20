"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import { MdHome, MdOutlinePerson, MdPerson } from 'react-icons/md'
import { GoHome,GoHomeFill } from "react-icons/go";
import { FaRegQuestionCircle,FaQuestionCircle } from "react-icons/fa";
import { MdOutlineArticle,MdArticle } from "react-icons/md";
import { MdOutlineQuickreply,MdQuickreply } from "react-icons/md";

const SidebarItems = [
    {
        title:"Home",
        icon:<GoHome/>,
        filled:<GoHomeFill/>,
        href:"/community",
        active:(path)=>(path[1]==="community" && path.length===2)
    },
    {
        title:"Questions",
        icon:<FaRegQuestionCircle/>,
        filled:<FaQuestionCircle/>,
        href:"/community/question",
        active:(path)=>(path[2]==="question")
    },
    {
        title:"Posts",
        icon:<MdOutlineArticle/>,
        filled:<MdArticle/>,
        href:"/community/posts",
        active:(path)=>(path[2]==="posts")
    },
    {
        title:"Flashcards",
        icon:<MdOutlineQuickreply/>,
        filled:<MdQuickreply/>,
        href:"/community/flashcards",
        active:(path)=>(path[2]==="flashcards")
    },
]

const moreItems = [
    {
        title:"Profile",
        icon:<MdOutlinePerson/>,
        filled:<MdPerson/>,
        href:"/profile",
        active:(path)=>(path==="/profile")
    }
]

const CommunitySidebar = () => {
  return (
    <div className='w-full md:px-2 md:h-full md:min-h-[calc(100vh-80px)] max-md:border-t border-neutral-200 flex bg-background/80 backdrop-blur-sm py-1 md:flex-col md:justify-between md:items-start md:gap-y-4 md:py-5'>
        <>
        {
            SidebarItems.map((item,index)=>(
                <SidebarItem key={index} item={item}/>
            ))
        }
        </>
        <div className='hidden w-full md:block mt-auto max-w-sm'>
            {
                moreItems.map((item,index)=>(
                    <SidebarItem key={index} item={item}/>
                ))
            }
        </div>
    </div>
  )
}

export default CommunitySidebar


const SidebarItem = ({item}) => {
    const path = usePathname().split("/")
    const active = item.active(path)

    return (
        <Link href={item.href} className='w-full'>
            <div className={`w-full flex flex-col md:flex-row max-md:rounded-full items-center gap-y-1 p-2 cursor-pointer  transition-all rounded-full md:p-3  ${active?"md:bg-primary/80 md:text-primary-foreground":"md:hover:bg-secondary"} `}>
                <div className={`p-1 px-5 ${active?"bg-primary/80 text-primary-foreground md:bg-transparent":""} rounded-full`}>
                    <div className='scale-110 md:scale-125'>{ (active && item.filled)? item.filled :item.icon}</div>
                </div>
                <span className={`max-md:text-sm ${active?"text-primary md:text-primary-foreground":""}`}>{item.title}</span>
            </div>
        </Link>
    )
}