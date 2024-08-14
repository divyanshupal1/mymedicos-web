"use client"
import { useUserStore } from '@/store/userStore'
import React from 'react'

const Header = ({title,description}) => {
    const {user} = useUserStore(state=>({user:state.user}))
    return (
        <div>
            <div className='text-[#35AA86] font-bold text-lg'> {title?title:<>👋 Hey {user?.displayName}!</>} </div>
            <div className='pl-7'>{description}</div>
        </div>
    )
}

export default Header