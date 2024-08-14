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


const Sidebar = () => {
    const [open, setOpen] = React.useState(false)
    const path = usePathname().split("/")
    if(path[1]=="pgneet" && path[2]=="swt" && path.length>4) return null
    if(path[1]=="pgneet" && path[2]=="cwt" && path.length>5) return null

    return (
        <div className={`sidebar border-r-2 border-slate-100 h-full min-h-screen  w-1/5 max-md:w-full min-w-[200px] max-w-[400px] sticky top-0 max-md:absolute bg-background transition-all ${open?"max-md:translate-x-0":"max-md:-translate-x-full"}`}>
            <div className='w-full flex flex-col items-start justify-start p-3'>
                <div className='text-xl font-bold text-[#484A4F] '>Quick Access</div>
                <Accordion type="single" collapsible className='w-full' defaultValue='item-1'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-bold text-[#0E6852]"><span >QUESTION BANK</span></AccordionTrigger>
                        <AccordionContent>
                            <div className='w-full h-full flex flex-col gap-y-1'>
                                <SideBarTab title='Grand Test' href='/pgneet/gt' active={'gt'}/>
                                <SideBarTab title='Subject Wise' href='/pgneet/swt' active={'swt'}/>
                                <SideBarTab title='Chapter Wise' href='/pgneet/cwt' active={'cwt'}/>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className='absolute top-0 right-[-10%] bg-slate-100 rounded-md p-2 hidden max-md:block' onClick={()=>setOpen(!open)}>
                <div className={`transition-all ${open?"rotate-180":""}`}><ChevronRight className={`w-6 h-6 scale-125 `}/></div>
            </div>
        </div>
    )
}

export default Sidebar

const SideBarTab = ({title,href,active}) =>{
    let ico = title.split(" ").map((word)=>word[0]).join("")
    const path = usePathname().split("/").slice(1)

    return(
        <Link href={href}>
            <div className={`w-full p-3 py-2 text-base font-medium hover:bg-slate-200  flex items-center rounded-md hover:shadow-sm cursor-pointer ${path[1]==active?"bg-slate-200":""}`}>
                <span className='p-1 px-2 border-2 rounded-md mr-3 text-xs'>{ico}</span> {title}
            </div>
        </Link>
    )
}