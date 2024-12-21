"use client"
import GTTestPage from '@/components/testpage/gt-testpage'
import LoadingScreen from '@/components/ui/loading-screen'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { AlreadySumbitted, UpgradePlan } from '../components/defaultPages'


const Test = () => {

  const path = usePathname()
  const router = useRouter()
  const user = useUserStore(state=>state.user)
  useEffect(()=>{
      if(user==null) router.push('/auth?callback='+path)
      else if(section==undefined || category==undefined || id==undefined) router.push('/home')
  },[user])



  const section = useSearchParams().get('section')
  const category = useSearchParams().get('category')
  const id = useSearchParams().get('id')

  const [loading,setLoading] = useState(true)
  const [quiz,setQuiz] = useState({})

  const [code,setCode] = useState(null)

  useEffect(() => {
    setLoading(true)
    async function getQuiz(){
      try{
        let res = await fetch(`/api/getQuiz?section=${section}&category=${category}&id=${id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let data = await res.json()
        //console.log(data)
        if(data.success){
          setQuiz(data.data)
          setLoading(false)
        }
        else{
          setCode(data.code)
        }
        setLoading(false)
      }
      catch(e){
        ////console.log(e)
        alert("Something went wtong")
        setLoading(false)
      }
    }
    getQuiz()
  },[category, id, section])

  if(loading || section==undefined || category==undefined || id==undefined) return <LoadingScreen/>  
  if(code==1) return <AlreadySumbitted url={section+'/'+category}/>
  if(code==2 || code==3) return <UpgradePlan/>  
  return  <GTTestPage category={section} quizData={JSON.stringify(quiz)}/>
}

export default Test
