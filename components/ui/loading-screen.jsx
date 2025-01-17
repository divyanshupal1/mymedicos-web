import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingScreen = () => {
    return (
        <div className='w-full h-[calc(100vh/2)] flex items-center justify-center'>
            <div className='animate-spin text-green-600'>
                <AiOutlineLoading3Quarters className='scale-[2]'/>
            </div>
        </div>
    )
}

export default LoadingScreen