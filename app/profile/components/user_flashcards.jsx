import LoadingScreen from '@/components/ui/loading-screen'
import { useProfileStore } from '@/store/useProfileStore'
import { useUserStore } from '@/store/userStore'
import Link from 'next/link'
import React from 'react'
import { MdOutlineModeComment, MdOutlinePunchClock } from 'react-icons/md'
import { Clock, Heart, MessageCircle } from 'lucide-react'

const UserFlashcards = () => {
    const {user} = useUserStore(state=>({
        user:state.user
    }))

    const {flashcards,getMyFlashcards} = useProfileStore(state=>({
        flashcards:state.flashcards,
        getMyFlashcards:state.getMyFlashcards
    }))

    React.useEffect(()=>{
        if(!flashcards.loaded) getMyFlashcards(user.uid)
    },[getMyFlashcards, flashcards.loaded, user.uid])

    if(flashcards.loading) return <LoadingScreen/>
    if(flashcards.error) return <div className='text-red-500'>{flashcards.error}</div>

  return (
    <div className='grid md:grid-cols-2 gap-4 p-2'>
        {
            flashcards.data.map((flashcard)=>(
                <Link key={flashcard._id} href={`/community/question/-${flashcard._id}}`}>
                <div key={flashcard._id} className='w-full flex flex-col justify-between gap-1 p-4 border drop-shadow-md bg-card hover:opacity-80 rounded-md border-gray-200 min-h-[150px]'>
                    <div className='w-full'>
                        <h1 className='text-sm text-gray-500 font-semibold line-clamp-1'>{flashcard.title}</h1>
                        <p className='text-base  line-clamp-3 my-1' dangerouslySetInnerHTML={{__html:flashcard.body}}></p>
                    </div>
                    <div className='w-full flex items-center justify-start gap-3 mt-3'>
                        <div className='flex items-center p-0 h-fit bg-green-100/50 rounded-full px-3 py-1 gap-x-1'>
                            <Heart className='scale-75'/>
                            <span className='text-sm space-x-2'>{flashcard.likeCount} <span className='hidden md:inline'>Likes</span></span>
                        </div>
                        <div className='flex items-center p-0 h-fit bg-green-100/50 rounded-full px-3 py-1 gap-x-1'>
                            <MessageCircle className='scale-75'/>
                            <span className='text-sm'>{flashcard.commentCount} <span className='hidden md:inline'>Comments</span></span>
                        </div>
                        <div className='flex items-center p-0 h-fit bg-green-100/50 rounded-full px-3 py-1 gap-x-1'>
                            <Clock className='scale-75'/>
                            <span className='text-sm whitespace-nowrap'>{flashcard.readtime} <span className='hidden md:inline'>Readtime</span></span>
                        </div>
                    </div>
                </div>
                </Link>
            ))
        }
    </div>
  )
}

export default UserFlashcards