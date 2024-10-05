"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";
const QuizCard = ({section,category,speciality,quiz,locked}) => {
    const router = useRouter()
    const handleclick = () => {
        router.push(`/test${category==='gt'?"/gt":""}?section=${section}&category=${category}&speciality=${speciality}&id=${quiz.qid}`)
    }
    return (
        <div onClick={handleclick} className='border group border-neutral-200 w-[49%] min-w-[350px] flex items-center justify-between gap-x-4 p-2 px-2 pr-5 rounded-lg hover:bg-[#00BFA6] shadow-md cursor-pointer'>
            <div className='flex items-center gap-x-4'>
                <div className='h-10 w-10 bg-[#00BFA6] rounded-lg group-hover:bg-background shadow-md'></div>
                <div className='font-semibold group-hover:text-white'>{quiz?.title}</div>
            </div>
            {
                quiz?.type == 'Paid' && (locked ? <div className='bg-red-100 text-red-600 p-1 rounded-full'><MdOutlineLock/></div> :<div className='bg-green-100 text-green-600 p-1 rounded-full'><MdOutlineLockOpen/></div>)
            }
        </div>
    )
}

export default QuizCard