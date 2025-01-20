import LoadingScreen from '@/components/ui/loading-screen'
import { useProfileStore } from '@/store/useProfileStore'
import { useUserStore } from '@/store/userStore'
import Link from 'next/link'
import React from 'react'
import { MdOutlineModeComment } from 'react-icons/md'

const UserQuestions = () => {
    const {user} = useUserStore(state=>({
        user:state.user
    }))

    const {questions,getMyQuestions} = useProfileStore(state=>({
        questions:state.questions,
        getMyQuestions:state.getMyQuestions
    }))

    React.useEffect(()=>{
        if(!questions.loaded) getMyQuestions(user.uid)
    },[getMyQuestions, questions.loaded, user.uid])

    if(questions.loading) return <LoadingScreen/>
    if(questions.error) return <div className='text-red-500'>{questions.error}</div>

  return (
    <div className='grid md:grid-cols-2 gap-4 p-2'>
        {
            questions.data.map((question)=>(
                <Link key={question._id} href={`/community/question/${question.title.replaceAll("?", "").replaceAll(" ", "-")}-${question._id}`}>
                <div key={question._id} className='w-full p-4 border drop-shadow-md bg-card hover:opacity-80 rounded-md border-gray-200'>
                    <h1 className='text-base font-semibold line-clamp-1'>{question.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-3' dangerouslySetInnerHTML={{__html:question.body}}></p>
                    <div className='w-full flex items-center justify-between mt-2'>
                        <div className='flex items-center p-0 h-fit bg-green-100/10 rounded-full px-4 py-2 gap-x-2'>
                            <MdOutlineModeComment />
                            <span className='text-sm'>{question.postCount} Answers</span>
                        </div>
                    </div>
                </div>
                </Link>
            ))
        }
    </div>
  )
}

export default UserQuestions