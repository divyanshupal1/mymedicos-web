"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { SecondaryTabs } from './components/secondary_tabs'
import LoadingScreen from '@/components/ui/loading-screen'
import UserDetails from './components/user_details'
import SwitchTabs from './components/switch_tabs'

const UserQuestions = dynamic(()=>import('./components/user_questions'),{loading:()=><LoadingScreen/>})
const UserAnswers = dynamic(()=>import('./components/user_answers'),{loading:()=><LoadingScreen/>})
const UserPosts = dynamic(()=>import('./components/user_posts'),{loading:()=><LoadingScreen/>})
const UserFlashcards = dynamic(()=>import('./components/user_flashcards'),{loading:()=><LoadingScreen/>})


const communityTabs = [
    {
        name:'Questions',
        component:<UserQuestions/>
    },
    {
        name:'Answers',
        component:<UserAnswers/>
    },
    {
        name:'Posts',
        component:<UserPosts/>
    },
    {
        name:'Flashcards',
        component:<UserFlashcards/>
    }
]
const medmyTabs = [
  {
      name:'Enrolled Courses',
      component:<div>Courses</div>
  },{
      name:'Bookmarks',
      component:<div>Bookmarks</div>
  }
]

const tabs = [communityTabs,medmyTabs]

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState(0)
  const [secondaryTab, setSecondaryTab] = React.useState(0)

  const router = useRouter()

  const {user,loading,loaded}= useUserStore(state=>({
      user:state.user,
      loading:state.loading,
      loaded:state.loaded
  }))

  if(loading) return <LoadingScreen/>

  if(loaded && user==null) router.push('/auth/login')

  return (
    <div className='w-full'>
        <div className='w-full max-w-4xl mx-auto'>
          <UserDetails/>
        </div>
        <div className='max-sm:fixed bottom-1 left-1/2 max-sm:-translate-x-1/2 w-full max-w-4xl mx-auto mt-2 p-2'>
          <SwitchTabs activeTab={activeTab} setActiveTab={(tab)=>{setActiveTab(tab);setSecondaryTab(0)}}/>
        </div>
        <div className='w-full mt-4 max-w-4xl mx-auto overflow-y-auto scroll-hide  border-b border-gray-200'>
            <SecondaryTabs tabs={tabs[activeTab]} activeTab={secondaryTab} mainActive={activeTab} setActiveTab={setSecondaryTab}/>
        </div>
        <div className='w-full max-w-4xl mx-auto'>
           {tabs[activeTab][secondaryTab].component}
        </div>
    </div>
  )
}

export default Profile