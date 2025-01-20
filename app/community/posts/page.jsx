"use client"
import React from 'react'
import LoadingScreen from '@/components/ui/loading-screen'
import { useCommunityStore } from '@/store/useCommunityStore'
import {QuestionCard} from '../components/question_card'
import { PostCard } from '../components/post_card'

const FlashcardsPage = () => {
    const {getPostFeed,postFeed,posts} = useCommunityStore((state)=>({
        getPostFeed:state.getPostFeed,
        postFeed:state.postFeed,
        posts:state.posts
    }))

    React.useEffect(()=>{
        if(!postFeed.loaded) {
          getPostFeed()
        }
    },[postFeed.loaded, getPostFeed])

    if(postFeed.loading){
        return <LoadingScreen/>
    }
    // console.log(feedQestions)

    return (
        <div className='mt-3 mx-auto w-full space-y-3 pb-10 '>
            {postFeed.data.map((key,index)=>(
                <PostCard key={index} postId={key}/>
            ))}
        </div>
    )
}


export default FlashcardsPage