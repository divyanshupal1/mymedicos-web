"use client"
import React from 'react'
import {cn} from '@/lib/utils'
import { cva } from 'class-variance-authority'


const quizBubbleVariants = cva(
    'w-8 h-8 inline-flex items-center justify-center p-1 rounded-full shadow-sm cursor-pointer flex-grow-0 relative',
    {
        variants :{
            variant:{
                answered:'bg-green-300',
                current: 'bg-yellow-300',
                default: 'bg-white'
            }
        },
        defaultVariants: 'default'        
    }
)


const QuizSidebar = ({questions,answered,setCurrentQuestion,currentQuestion,review}) => {
    return (
        <>            
            <div className='flex items-start justify-start gap-x-2 gap-y-3 flex-wrap p-4 flex-shrink-0 *:flex-grow-0'>
                {
                    Object.keys(questions).map((data,index)=>
                        <div 
                        onClick={()=>setCurrentQuestion(index)} 
                        className={cn(quizBubbleVariants({
                            variant: 
                            currentQuestion==index ? 'current' : 
                            answered[index]!=undefined ? "answered" : 
                            'default'
                        }))} 
                        key={index}
                        >   {review.includes(index) && <span className='w-2 h-2 rounded-full absolute top-0 right-0 z-10 bg-orange-500'></span>}
                            {index+1}
                        </div>
                    )
                }
            </div>            
        </>
    )
}

export default QuizSidebar