"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
const CategoryCard = ({title,section,category,speciality}) => {
    
    const router = useRouter()
    const handleclick = () => {
        router.push(`/${section}/${category}/${speciality}`)
    }
    return (

        <div onClick={handleclick} className='border group border-neutral-300 w-[49%] min-w-[400px] flex items-center gap-x-4 p-2 px-2 pr-5 rounded-lg hover:bg-[#00BFA6] shadow-sm cursor-pointer'>
            <div className='h-10 w-10 bg-[#00BFA6] rounded-lg group-hover:bg-background shadow-md'></div>
            <div className='font-semibold group-hover:text-white'>{title}</div>
        </div>
    )
}

export default CategoryCard