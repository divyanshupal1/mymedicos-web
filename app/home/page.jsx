"use client"
import React, { useEffect } from 'react'
import { HomeCaraousel } from './components/home_carousel'
import YourGoals from './components/your_goals'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import Plans from './components/plans'
import GTsection from './components/gt_section'
import AnalyticsSection from './components/analytics_section'
import GridSection from './components/grid_section'

const Page = () => {

    const router = useRouter()
    const user = useUserStore(state=>state.user)
    useEffect(()=>{
        if(user==null) router.push('auth?callback=/home')
    },[user])
    if(user==null){
        return <></>
    }

    return (
        <div className='w-full h-screen'>
            <div className='w-full'>
                <HomeCaraousel/>
            </div>
            <div className='w-full h-auto'>
                <YourGoals/>
            </div>
            <div className='w-full h-auto'>
                <Plans/>
            </div>
            <div className='w-full h-auto'>
                <GTsection/>
            </div>
            <div className='w-full h-auto'>
                <AnalyticsSection/>
            </div>
            <div className='w-full h-auto'>
                <GridSection/>
            </div>
            <div className='min-h-[40vh] w-full bg-neutral-50 border-t border-neutral-100 mt-[5%]'>

            </div>
        </div>
    )
}

export default Page
