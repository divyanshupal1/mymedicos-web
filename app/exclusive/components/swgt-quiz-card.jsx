import React from 'react'
import Link from 'next/link'

const SWGTQuizCard = ({title,questions,courseId,quizId,type}) => {
  return (
    <Link href={`/test/exclusive?course=${courseId}&quiz=${quizId}&type=${type}`} className='w-full bg-card cursor-pointer flex items-center gap-x-3 p-2 border-2 border-neutral-100 dark:border-transparent hover:border-border hover:dark:border-green-900 shadow-sm hover:shadow-md rounded-lg transition-all duration-200'>
        <div className='h-full aspect-square bg-border rounded-lg'></div>
        <div className='flex flex-col'>
            <h3 className='font-medium text-base'>{title}</h3>
            <p className='text-sm text-gray-500'>{questions} Questions</p>
        </div>
    </Link>
  )
}


export default SWGTQuizCard