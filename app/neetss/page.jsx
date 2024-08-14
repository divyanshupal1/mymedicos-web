"use client"
import React,{useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'

const NEETSS = () => {
    const router = useRouter()
    const user = useUserStore(state=>state.user)
    useEffect(()=>{
        if(user==null) router.push('auth?callback=/neetss')
    },[user])
    if(user==null){
        return <></>
    }

    return (
      <div>NEETSS</div>
    )
}

export default NEETSS