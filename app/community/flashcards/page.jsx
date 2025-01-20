"use client"
import React from 'react'
import LoadingScreen from '@/components/ui/loading-screen'
import { useCommunityStore } from '@/store/useCommunityStore'
import {QuestionCard} from '../components/question_card'
import { PostCard } from '../components/post_card'

const FlashcardsPage = () => {
    const {getFlashcardFeed,flashcardFeed,posts} = useCommunityStore((state)=>({
        getFlashcardFeed:state.getFlashcardFeed,
        flashcardFeed:state.flashcardFeed,
        posts:state.posts
    }))

    React.useEffect(()=>{
        if(!flashcardFeed.loaded) {
          getFlashcardFeed()
        }
    },[flashcardFeed.loaded, getFlashcardFeed])

    if(flashcardFeed.loading){
        return <LoadingScreen/>
    }
    // console.log(feedQestions)

    return (
        <div className='mt-3 mx-auto w-full space-y-3 pb-10 '>
            {flashcardFeed.data.map((key,index)=>(
                <PostCard key={index} postId={key} flashcard/>
            ))}
        </div>
    )
}


export default FlashcardsPage