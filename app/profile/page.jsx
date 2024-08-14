"use client"
import React,{useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'


const Profile = () => {

  const router = useRouter()
  const user = useUserStore(state=>state.user)
  useEffect(()=>{
      if(user==null) router.push('auth?callback=/profile')
  },[user])
  if(user==null){
      return <></>
  }

  return (
    <div>Profile</div>
  )
}

export default Profile