"use client"
import TestPage from '@/components/testpage/testpage'
import LoadingScreen from '@/components/ui/loading-screen'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { AlreadySumbitted, UpgradePlan } from './components/defaultPages'


const Test = () => {

  const path = usePathname()
  const router = useRouter()
  const user = useUserStore(state=>state.user)
  useEffect(()=>{
    if(user==null) router.push('/auth?callback='+path)
  },[user])



  const section = useSearchParams().get('section')
  const category = useSearchParams().get('category')
  const id = useSearchParams().get('id')
  const [code,setCode] = useState(null)
  const [loading,setLoading] = useState(true)
  const [quiz,setQuiz] = useState({})

  useEffect(() => {
    setLoading(true)
    async function getQuiz(){
      fetch(`/api/getQuiz?section=${section}&category=${category}&id=${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          if(data.success){
            setQuiz(data.data)
            setLoading(false)
            //console.log(data.data)
          }
          else{
            setCode(data.code)
          }
          setLoading(false)
      }).catch((e)=>{
        alert("Something went wtong")
      })
    }
    getQuiz()
  },[category, id, section])

  if(loading || user==null) return <LoadingScreen/>  
  if(code==1) return <AlreadySumbitted url={section+'/'+category}/>
  if(code==2 || code==3) return <UpgradePlan/>  
  return  <TestPage category={category} section={section} quizData={JSON.stringify(quiz)}/>
}

export default Test