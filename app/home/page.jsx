import React from 'react'
import { HomeCaraousel } from './components/home_carousel'
import YourGoals from './components/your_goals'
import Plans from './components/plans'
import GTsection from './components/gt_section'
import AnalyticsSection from './components/analytics_section'
import GridSection from './components/grid_section'
import { permanentRedirect } from 'next/navigation'

const Page = () => {
    permanentRedirect('/exclusive')
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
