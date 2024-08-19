"use client"
import { useUserStore } from '@/store/userStore'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Suspense } from 'react';



const AuthPage = () => {

    const router = useRouter()
    const {toast} = useToast()

    const query = useSearchParams().get('callback')

    const {loggeduser,setUser} = useUserStore((state)=>({
        loggeduser:state.user,
        setUser:state.setUser
    })) 
    React.useEffect(()=>{

        if(loggeduser!=null){
            router.push(query)
            return;
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                loggeduser==null && toast({
                    title:`Welcome back ${user.displayName!=null ? user.displayName :""} 😊 !`,
                })
                fetch('/api/auth/login',{
                    method:'POST',
                    body:JSON.stringify({user:user}),
                }).then(async (res)=>{
                    const data = await res.json()
                    if(data.success){
                        user.subscription = data.subscription
                    }
                })
                setUser(user)
                if(query=='/') router.push('/home')
                else router.push(query)

            } else {
                setUser(null)
                if(query=='/') router.push('/')
                else router.push('/login')
            }
        })
    },[loggeduser, query, router, setUser, toast])

    return (
    <>
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='animate-spin'><AiOutlineLoading3Quarters className='text-[#0b7a62] scale-150'/></div>
        </div>
    </>
    )

}

export default function Page () {
    return (
        <Suspense 
            fallback={
                <div className='w-full h-screen flex items-center justify-center'>
                    <div className='animate-spin'><AiOutlineLoading3Quarters className='text-[#0b7a62] scale-150'/></div>
                </div>
            }
        >
                <AuthPage />
        </Suspense>
    )
}