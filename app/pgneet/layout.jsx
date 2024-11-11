"use client"

import React, { useEffect } from 'react'
import Sidebar from './components/sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import Doubt from '@/components/doubt/doubt'

const PgNeetLayout = ({ children }) => {
    const path = usePathname()
    const router = useRouter()
    const user = useUserStore(state => state.user)
    useEffect(() => {
        if (user == null) router.push('/auth?callback=' + path)
    }, [user])

    if (user == null) {
        return <></>
    }

    return (
        <>
        {/* <Doubt /> */}
        <div className='w-full h-auto flex relative'>
            <Sidebar />
            <div className=' w-full h-auto'>
                {children}
            </div>
        </div>
        </>
    )
}

export default PgNeetLayout