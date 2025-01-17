"use client"
import React from 'react'
import LoadingScreen from '@/components/ui/loading-screen'
import { useCommunityStore } from '@/store/useCommunityStore'
import {QuestionCard} from './question_card'

export const QuestionsFeed = () => {
    const {questions,feedQestions,fetchFeed} = useCommunityStore((state)=>({
        questions:state.questions,
        feedQestions:state.feedQestions,
        fetchFeed:state.fetchFeed
    }))

    React.useEffect(()=>{
        if(!feedQestions.loaded) {
            fetchFeed()
        }
    },[feedQestions.loaded, fetchFeed])

    if(feedQestions.loading){
        return <LoadingScreen/>
    }
    console.log(feedQestions)

    return (
        <div className='mt-3 mx-auto w-full space-y-3 pb-10 divide-y-2 divide-gray-300 dark:divide-gray-700'>
            {feedQestions.data.map((key,index)=>(
                <QuestionCard key={index} question={questions[key]}/>
            ))}
        </div>
    )
}
