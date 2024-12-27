"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    {name:'Home',href:"/exclusive",active:(path)=> path.length===2 && path[1]==='exclusive'},
    {name:'My Courses',href:"/exclusive/mycourses",active:(path)=>path[2]==='mycourses'},
    {name:'Instructors',href:"/exclusive/instructors",active:(path)=>path[2]==='instructors'},
    {name:'All Courses',href:"/exclusive/courses",active:(path)=>path[2]==='courses'},
]


const ExclusiveNavbar = () => {

  return (
    <div className='w-full h-full flex justify-start items-center gap-x-2 overflow-auto scroll-hide'>
        {
            links.map((link,index)=>
                <Navlink key={index} item={link}/>
            )
        }
    </div>
  )
}

export default ExclusiveNavbar

const Navlink = ({item}) => {
    const path = usePathname().split('/')
    const active = item.active(path) || false

    return (
        <Link href={item.href} className='h-full'>
            <div className={`h-full flex items-center whitespace-nowrap border-b-[4px] border-transparent  px-4 text-base font-medium tracking-wide  ${active?"!border-border":"hover:border-border"} `}>{item.name}</div>
        </Link>
    )
}