"use client"
import UserAvatar from '@/components/avatar'
import { useUserStore } from '@/store/userStore'
import React from 'react'


const UserDetails = () => {

    const {user}= useUserStore(state=>({
        user:state.user,
    }))
    return (
        <div className='w-full p-4 flex items-start justify-start gap-6'>
            <div>
                <UserAvatar className={'size-20 sm:size-24 md:size-28 lg:size-32 drop-shadow'} img={user?.doc?.Profile} name={`${user?.doc?.Name}`}/>
            </div>
            <div className='mt-4'>
                <h1 className='text-xl  md:text-2xl font-semibold'>{`${user?.doc?.Prefix} ${user?.doc?.Name}`}</h1>
                <p className='text-sm text-gray-600 max-w-xl mt-2'>{user?.doc?.bio || "ashfaj sdfhksjf jdsfjksdf  hdksjfhsjk  sdkhfdf  sdhkfljk hsdkfjdsf sdhfkjsdhf  dhfkshfkdsjf sdfhkjfhsf dsfhkjd skdjfhksdjfhkdsj dshfkdsfjksh hsdkjfhskdjh"}</p>
            </div>
        </div>
    )
}

export default UserDetails