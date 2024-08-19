"use client"
import React from 'react'
import QuizCard from './quiz_card'
import { useParams } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

const tabs = ['All','Basic','Standard','Premium','Pro']

const QuizList = ({quizes,section,category}) => {
    
    const user = useUserStore(state => state.user)
    const [tab,setTab] = React.useState(0)

    let speciality = useParams().speciality.replace("%20"," ")
    quizes = JSON.parse(quizes)

    const quizData = {
        'All':quizes,
        'Basic':quizes.filter(quiz => quiz.type == 'Free'),
        'Standard':quizes.filter(quiz => quiz.hyOption == 'Standard'),
        'Premium':quizes.filter(quiz => quiz.hyOption == 'Premium'),
        'Pro':quizes.filter(quiz => quiz.hyOption == 'Pro')
    }

    const allowed = tabs.indexOf(user?.subscription?.hyOption) || 1

    return (
        <>
        <div className='flex flex-wrap gap-y-2 gap-x-4 w-full border-b-2 border-neutral-200 pb-2 mt-4'>
            {
                tabs.map((tabname,index) => (
                    <div key={index} onClick={() => setTab(index)} className={`cursor-pointer border px-4 rounded-full py-1 ${tab==index?'bg-[#00BFA6] text-white':' border-neutral-200'}`}>{tabname}</div>
                ))
            }
        </div>
        <div className='subjects w-full mt-8 flex gap-x-2 flex-wrap gap-y-2 max-lg:justify-center'>
                    {
                        quizData[tabs[tab]].length == 0 && <div className='text-lg text-neutral-500 text-center w-full'>No quizes found</div>
                    }
                    {
                        quizData[tabs[tab]].map((quiz,index) => (
                            <QuizCard 
                                key={index} 
                                section={section} 
                                category={category}
                                speciality={speciality} 
                                quiz={quiz} 
                                locked={tabs.indexOf(quiz.hyOption)>allowed}
                            />
                        ))
                    }
        </div>
        </>
    )
}

export default QuizList