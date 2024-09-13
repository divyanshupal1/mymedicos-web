import React from 'react'

const AnalyticsSection = () => {
  return (
    <div className='w-full mt-[5%] '>
        <div className='text-2xl font-bold text-center flex items-center justify-center gap-x-2'>
            <span><img src='/images/analytics.svg' className='w-10 h-10' alt='graphic'/></span>
            <span className='text-[#F16136] ml-2'>In-Depth</span> 
            Analytics
        </div>
        <div className='flex flex-col md:flex-row gap-y-20 items-center justify-center gap-x-20 mx-auto mt-[5%] h-auto p-5'>
            <div>
                <img src='/images/home-graphic-2.svg' className='h-full w-auto'/>
                <p className='w-2/3 mx-auto text-center text-lg font-bold mt-4'>Maintain Streak and win amazing prizes</p>
            </div>
            <div>
                <img src='/images/home-graphic-3.svg' className='h-full w-auto'/>
                <p className='w-2/3 mx-auto text-center text-lg font-bold mt-4'>Boost Your Study with Subject-Specific Tests</p>
            </div>
            <div>
                <img src='/images/home-graphic-4.svg' className='h-full w-auto'/>
                <p className='w-2/3 mx-auto text-center text-lg font-bold mt-4'>Elevate Your Study with Chapter wise Test</p>
            </div>
        </div>
    </div>
  )
}

export default AnalyticsSection