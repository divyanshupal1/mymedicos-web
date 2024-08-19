"use client"
import TestPage from '@/components/testpage/testpage'
import LoadingScreen from '@/components/ui/loading-screen'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'


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
          if(data.success){
            setQuiz(data.data)
          }
          else{
            console.log(data.message)
          }
          setLoading(false)
      }).catch((e)=>{
        alert("Something went wtong")
      })
    }
    getQuiz()
  },[category, id, section])

  if(loading || user==null || section==undefined || category==undefined || id==undefined || quiz.qid==undefined) return <LoadingScreen/>  
  return  <TestPage category={section} quizData={JSON.stringify(quiz)}/>
}

export default Test