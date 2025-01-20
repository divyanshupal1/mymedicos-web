import LoadingScreen from '@/components/ui/loading-screen'
import { useProfileStore } from '@/store/useProfileStore'
import { useUserStore } from '@/store/userStore'
import Link from 'next/link'
import React from 'react'
import { MdOutlineModeComment } from 'react-icons/md'
import { Heart } from 'lucide-react'

const UserAnswers = () => {
    const {user} = useUserStore(state=>({
        user:state.user
    }))

    const {answers,getMyAnswers} = useProfileStore(state=>({
        answers:state.answers,
        getMyAnswers:state.getMyAnswers
    }))

    React.useEffect(()=>{
        if(!answers.loaded) getMyAnswers(user.uid)
    },[getMyAnswers, answers.loaded, user.uid])

    if(answers.loading) return <LoadingScreen/>
    if(answers.error) return <div className='text-red-500'>{answers.error}</div>

  return (
    <div className='grid md:grid-cols-2 gap-4 p-2'>
        {
            answers.data.map((answer)=>(
                <Link key={answer._id} href={`/community/question/-${answer._id}}`}>
                <div key={answer._id} className='w-full flex flex-col justify-between gap-2 p-4 border drop-shadow-md bg-card hover:opacity-80 rounded-md border-gray-200 min-h-[150px]'>
                    <div className='w-full'>
                        <h1 className='text-sm text-gray-500 font-semibold line-clamp-1'>{answer.question.title}</h1>
                        <p className='text-base  line-clamp-3 my-1' dangerouslySetInnerHTML={{__html:answer.body}}></p>
                    </div>
                    <div className='w-full flex items-center justify-start gap-3 mt-auto'>
                        <div className='flex items-center p-0 h-fit bg-green-100/10 rounded-full px-4 py-2 gap-x-2'>
                            <Heart/>
                            <span className='text-sm'>{answer.likeCount} Likes</span>
                        </div>
                        <div className='flex items-center p-0 h-fit bg-green-100/10 rounded-full px-4 py-2 gap-x-2'>
                            <MdOutlineModeComment />
                            <span className='text-sm'>{answer.commentCount} Comments</span>
                        </div>
                    </div>
                </div>
                </Link>
            ))
        }
    </div>
  )
}

export default UserAnswers