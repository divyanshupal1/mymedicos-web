"use client"
import React from 'react'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import SignupGraphic from './components/SignupGraphic'
import SignupForm from './components/SignupForm'

const SignUpPage = () => {
  const router = useRouter()
  const user = useUserStore(state=>state.user)
  if(user==null) router.push('/auth/login')
  if(user?.displayName!=null && user?.doc!==null){
    router.push('/home')
  }
  return (
    <div className='flex max-md:flex-col items-start  h-full w-full'>
      <div className='w-2/5 max-md:w-full h-full max-h-[calc(100vh-80px)] flex items-start justify-start sticky top-16'>
        <SignupGraphic/>
      </div>
      <div className='w-3/5  max-md:w-full h-auto flex flex-col items-center justify-center relative p-4'>
        <SignupForm/>
      </div>
    </div>
  )
}

export default SignUpPage


