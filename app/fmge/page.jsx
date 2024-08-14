"use client"
import React,{useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'


const FMGE = () => {
    
    const router = useRouter()
    const user = useUserStore(state=>state.user)
    useEffect(()=>{
        if(user==null) router.push('auth?callback=/fmge')
    },[user])
    if(user==null){
        return <></>
    }

    return (
      <div>FMGE</div>
    )
}

export default FMGE