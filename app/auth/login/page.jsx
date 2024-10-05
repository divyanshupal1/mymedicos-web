import React from 'react'
import LoginForm from './components/LoginForm'
import LoginCarousel from './components/LoginCarousel'

const LoginPage = () => {
  return (
    <div className='flex h-full w-full rounded-lg overflow-hidden'>
      <div className='w-1/2 max-md:w-full flex items-center justify-center'>
        <LoginForm/>
      </div>
      <div className='w-1/2 h-full flex items-center justify-center relative max-md:hidden bg-[#03755A] '>
        <LoginCarousel/>
      </div>
    </div>
  )
}

export default LoginPage