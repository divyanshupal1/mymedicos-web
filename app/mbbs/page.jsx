"use client"
import React,{useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

const MBBS = () => {
    const router = useRouter()
    const user = useUserStore(state=>state.user)
    useEffect(()=>{
        if(user==null) router.push('auth?callback=/mbbs')
    },[user])
    if(user==null){
        return <></>
    }

    return (
      <div>MBBS</div>
    )
}

export default MBBS