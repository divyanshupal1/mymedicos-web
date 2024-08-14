"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import {cn} from '@/lib/utils'
import { cva } from 'class-variance-authority'


const quizBubbleVariants = cva(
    'w-8 h-8 inline-flex items-center justify-center p-1 rounded-full shadow-sm cursor-pointer flex-grow-0',
    {
        variants :{
            variant:{
                correct: 'bg-green-200',
                incorrect: 'bg-red-200',
                current: 'bg-yellow-300',
                default: 'bg-white'
            }
        },
        defaultVariants: 'default'        
    }
)


const QuizSidebar = ({questions,answered,score,setCurrentQuestion,currentQuestion}) => {
    return (
        <>            
            <div className='flex items-start justify-start gap-x-2 gap-y-3 flex-wrap p-4 flex-shrink-0 *:flex-grow-0'>
                {
                    Object.keys(questions).map((data,index)=>
                        <div 
                        onClick={()=>setCurrentQuestion(index)} 
                        className={cn(quizBubbleVariants({variant: currentQuestion==index ? 'current' : answered[index]!=undefined ? (answered[index]==questions[index].Correct ? 'correct' : 'incorrect') : 'default'}))} 
                        key={index}
                        >
                            {index+1}
                        </div>
                    )
                }
            </div>            
        </>
    )
}

export default QuizSidebar