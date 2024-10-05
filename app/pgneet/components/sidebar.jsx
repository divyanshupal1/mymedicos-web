"use client"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'


const tab_groups = [
    {
        group_title:"QUESTION BANK",
        open:true,
        group_tabs:[
            {title:"Home",href:"/pgneet",active:"/",ico:"HO"},
            {title:"Grand Test",href:"/pgneet/gt",active:"gt",ico:"GT"},
            {title:"Subject Wise",href:"/pgneet/swt",active:"swt",ico:"SW"},
            {title:"Chapter Wise",href:"/pgneet/cwt",active:"cwt",ico:"CW"},
        ]
    },
    {
        group_title:"Study Material",
        open:true,
        group_tabs:[
            {title:"Notes",href:"/pgneet/notes",active:"notes",ico:"NO"},
            {title:"Videos",href:"/pgneet/videos",active:"videos",ico:"VI"},
        ]
    },
]

const Sidebar = () => {
    const [open, setOpen] = React.useState(false)
    const path = usePathname().split("/")
    if(path[1]=="pgneet" && path[2]=="swt" && path.length>4) return null
    if(path[1]=="pgneet" && path[2]=="cwt" && path.length>5) return null

    return (
        <div className={`sidebar border-r-2 border-slate-100 h-full min-h-screen  w-1/5 max-md:w-[70%] min-w-[200px] max-w-[400px] sticky top-0 max-md:absolute bg-background transition-all ${open?"max-md:translate-x-0":"max-md:-translate-x-full"}`}>
            {
                tab_groups.map((tab,index)=>{
                    return (
                        <div className='w-full flex flex-col items-start justify-start p-3 pb-0' key={index}>
                            <Accordion type="single" collapsible className='w-full' defaultValue={tab?.open && 'item-1'}>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="font-bold text-[#0E6852]"><span >{tab.group_title}</span></AccordionTrigger>
                                    <AccordionContent>
                                        <div className='w-full h-full flex flex-col gap-y-1'>
                                            {
                                                tab.group_tabs.map((tab_item,index)=><SideBarTab key={index} title={tab_item.title} href={tab_item.href} active={tab_item.active} ico={tab_item.ico}/>)
                                            }
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )
                })
            }
            <div className='absolute top-0 right-[-10%] bg-slate-100 rounded-md p-2 hidden max-md:block' onClick={()=>setOpen(!open)}>
                <div className={`transition-all ${open?"rotate-180":""}`}><ChevronRight className={`w-6 h-6 scale-125 `}/></div>
            </div>
        </div>
    )
}

export default Sidebar

const SideBarTab = ({title,href,active,ico}) =>{
    const path = usePathname().split("/").slice(1)
    return(
        <Link href={href}>
            <div className={`w-full p-3 py-2 text-base font-medium hover:bg-slate-200  flex items-center rounded-md hover:shadow-sm cursor-pointer ${path[1]==active?"bg-slate-200":(path.length==1 && active=='/')?"bg-slate-200":""}`}>
                <span className='p-1 px-2 w-10 text-center border-2 rounded-md mr-3 text-xs'>{ico}</span> {title}
            </div>
        </Link>
    )
}