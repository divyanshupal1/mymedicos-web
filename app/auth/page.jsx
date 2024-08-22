"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Suspense } from 'react';
import { useCustomAuth } from '@/store/useCustomAuthHook';


const AuthPage = () => {
    const query = useSearchParams().get('callback')    
    const user = useCustomAuth(query)
    return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='animate-spin'><AiOutlineLoading3Quarters className='text-[#0b7a62] scale-150'/></div>
        </div>
    </>
    )

}

export default function Page () {
    return (
        <Suspense 
            fallback={
                <div className='w-full h-screen flex items-center justify-center'>
                    <div className='animate-spin'><AiOutlineLoading3Quarters className='text-[#0b7a62] scale-150'/></div>
                </div>
            }
        >
                <AuthPage />
        </Suspense>
    )
}


