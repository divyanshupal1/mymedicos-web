import { Button } from '@/components/ui/button';
import { Newspaper } from 'lucide-react';
import React from 'react'
import { CiCalculator2 } from "react-icons/ci";

const Bento = () => {
    return (
        <div className=" py-24 ">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-[1700px] lg:px-8 flex flex-col lg:flex-row items-center gap-4">
                <div className=" w-full flex-grow flex p-8 px-8 flex-col overflow-hidden bg-white rounded-lg">
                    {/* <div className=""> */}
                        <div className='flex items-center  gap-4'>
                            <img src='/images/logo_sm.svg' className='size-9' />
                            <div className='text-left'>
                                <p className="text-lg font-medium tracking-tight text-gray-950 ">Connect your expertise</p>
                                <p className="mt-1 text-sm/6 text-gray-600 max-lg:text-center">Learn, Discuss and Conclude from them.</p>
                            </div>
                        </div>
                    {/* </div> */}
                    <div className=" relative my-6  w-full grow max-lg:mx-auto max-lg:max-w-sm  grid grid-cols-4 gap-1">
                        <DoctorProfile name='Dr. John Doe' profile='https://avatar.iran.liara.run/public/job/doctor/male' />
                        <DoctorProfile name='Dr. John Doe' profile='https://avatar.iran.liara.run/public/job/doctor/male' />
                        <DoctorProfile name='Dr. John Doe' profile='https://avatar.iran.liara.run/public/job/doctor/male' />
                        <DoctorProfile name='Dr. John Doe' profile='https://avatar.iran.liara.run/public/job/doctor/male' />
                        {/* <DoctorProfile name='Dr. John Doe' profile='https://avatar.iran.liara.run/public/job/doctor/male' />
                            <DoctorProfile name='Dr. John Doe' profile='https://avatar.iran.liara.run/public/job/doctor/male' /> */}
                    </div>
                    <div className='w-full mt-6'>
                            <Button className='w-full rounded-full' >Join the community</Button>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row md:flex-col items-center gap-4 w-full h-full'>
                    <div className="relative flex items-start justify-start w-full h-full flex-col overflow-hidden bg-white rounded-lg p-5 px-8 pb-12">
                        <div className="">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 ">239+</p>
                            <p className="mt-2 max-w-lg text-base text-gray-600 max-lg:text-center">Easy to use clinical calculators</p>
                        </div>
                        <div className="absolute shadow-[0px_0px_10px_lightblue] -bottom-1 -right-1 size-28 flex items-center justify-center p-6 lg:p-8  bg-blue-500 text-blue-50 rounded-xl">
                            <CiCalculator2 className='scale-[6]' />
                        </div>
                    </div>
                    <div className="relative flex items-start justify-start w-full h-full flex-col overflow-hidden bg-white rounded-lg p-5 px-8 pb-12">
                        <div className="">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 ">News</p>
                            <p className="mt-2 max-w-lg text-base text-gray-600 max-lg:text-center">latest updates on the go</p>
                        </div>
                        <div className="absolute shadow-[0px_0px_10px_lightblue] -bottom-1 -right-1 size-28 flex items-center justify-center p-6 lg:p-8  bg-blue-500 text-blue-50 rounded-xl">
                            <Newspaper className='scale-[4]' />
                        </div>
                    </div>
                </div>
                <div className="relative flex items-start justify-start w-full h-full flex-col overflow-hidden bg-black rounded-lg p-5 px-8 pb-12 min-h-[300px]">
                    <div className="z-10">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-950 ">Endorsed</p>
                        <p className="mt-2 max-w-lg text-base text-gray-600 max-lg:text-center">by the specialists</p>
                    </div>
                    <video src='https://videos.pexels.com/video-files/5030437/5030437-hd_1920_1080_30fps.mp4' className='w-full h-full object-cover absolute top-0 left-0 opacity-80' autoPlay loop muted />
                </div>
            </div>
        </div>

    )
}

const DoctorProfile = ({ name, profile }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <img src={profile} className="size-12 rounded-full border-2 border-neutral-600" alt="doctor profile" />
            <div>
                <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">{name}</p>
                {/* <p className="text-sm text-gray-500">Cardiologist</p> */}
            </div>
        </div>
    )
}

export default Bento