import React from 'react'

const GTsection = () => {
    return (
        <div className='w-full min-h-[80vh] mt-[5%] flex items-center bg-[#DAFFEB]/40'>
            <div className='flex flex-col md:flex-row gap-y-20 items-center justify-center gap-x-20 mx-auto h-auto p-5'>
            <div className='max-w-[621px]'>
                <h6 className='text-3xl font-black text-[#1D277D]'>
                    Practice. Progress. Participate:
                    Upcoming Grand test 
                </h6>
                <p className='text-[#6E6767] mt-6'>The mymedicos Grand Test covers all high-yield topics and frequently repeated questions. Receive real-time rankings to see your all-India rank instantly and a detailed performance analysis to identify your strengths and weaknesses.</p>
                <div className='w-full mt-6 flex justify-start gap-x-4 items-center'>
                        <div className='border border-neutral-200 rounded-md bg-white p-3 min-w-[300px] max-w-sm'>
                            <div className='flex w-full items-center justify-between'>
                                <span className='bg-[#35AA86] rounded-full px-2 py-1 text-white text-xs'>upcoming</span>
                                <span className='text-sm'>19 Aug, 10:30 PM</span>
                            </div>
                            <div className='font-bold text-sm mt-2'>Grand Test 04</div>
                            <p className='text-xs text-[#42434B]'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className='p-3 h-full min-h-[100px] flex items-center bg-white border-neutral-200 border rounded-md'>
                            2 more GT&apos;s 
                        </div>
                </div>
            </div>
            <img src='/images/home-graphic-1.svg' className='w-full h-auto' alt='graphic'/>
            </div>
        </div>
    )
}

export default GTsection