"use client"
import React, { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';

export default function Home() {

    const router = useRouter()    
    const {loggeduser,setUser} = useUserStore(state=>({
      loggeduser:state.user,
        setUser:state.setUser
    }))
    const {toast} = useToast()

    useEffect(()=>{
      if(loggeduser!=null) router.push('/home')
      else{
        onAuthStateChanged(auth, (user) => {
          if (user) {
              loggeduser==null && toast({
                  title:`Welcome back ${user.displayName!=null ? user.displayName :""} 😊 !`,
              })
              setUser(user)
              router.push('/home')
          } else {
              setUser(null)
          }
      })
    }
    },[])
    

    return (
      <>
      
      </>
    );
}
