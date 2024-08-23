"use client"
import { db } from "@/lib/firebase"
import { useCustomAuth } from "@/store/useCustomAuthHook"
import { useUserStore } from "@/store/userStore"
import { collection, getDoc, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import Header from "./components/header"
import QuizCard from "./components/quiz_card"
import { usePathname } from "next/navigation"


const tabs = ['All','Basic','Standard','Premium','Pro']
const PGNEET = () => {
    const path = usePathname()
    const {user} = useCustomAuth('/pgneet')

    const allowed = tabs.indexOf(user?.subscription?.hyOption) || 1

    const [gt,setGt] = useState([])
    const [practiceSets,setPracticeSets] = useState([])

    useEffect(()=>{
        //console.log(user)
        async function getData(){
            const praciceSets = await getDocs(query(collection(db,'QuizProgress',user.uid,'pgneet'),where('submitted','==',false)))
            let temp = []
            praciceSets.forEach(doc=>{
                temp.push(doc.data())
            })
            setPracticeSets(temp)
            const gts = await getDocs(query(collection(db,'QuizProgress',user.uid,'GT'),where('submitted','==',false)))
            let temp_gts = []
            gts.forEach(doc=>{
                temp_gts.push(doc.data())
            })
            setGt(temp_gts)
            //console.log(temp,temp_gts)
        }
        getData()

    },[user,path])
    
    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto max-md:flex max-md:flex-col'>
            <div className='mt-[5%]'>
                <Header description={(gt.length==0 && practiceSets.length==0)?'All quizes completed':'Complete your active quizes'} />
            </div>
            {
                gt.length!=0 &&
                <div className="w-full pl-7 mt-8">
                <div className="text-lg font-medium">Grand Tests</div>
                <div className='subjects w-full mt-4  flex gap-x-2 flex-wrap gap-y-2 max-lg:justify-center'>
                    {
                        gt.map((quiz,index)=>
                            <QuizCard 
                                key={index} 
                                section={quiz.section} 
                                category={"gt"}
                                speciality={undefined} 
                                quiz={quiz?.quiz} 
                                locked={tabs.indexOf(quiz?.quiz?.hyOption)>allowed}
                            />
                        )
                    }
                </div>
                </div>
            }
            {
                practiceSets.length!=0 &&
                <div className="w-full pl-7 mt-8">
                <div className="text-lg font-medium">Practice Sets</div>
                <div className='subjects w-full mt-4  flex gap-x-2 flex-wrap gap-y-2 max-lg:justify-center'>
                    {
                        practiceSets.map((quiz,index)=>
                            <QuizCard 
                                key={index} 
                                section={quiz?.section} 
                                category={quiz.category}
                                speciality={quiz?.quiz?.speciality} 
                                quiz={quiz?.quiz} 
                                locked={tabs.indexOf(quiz.quiz?.hyOption)>allowed}
                            />
                        )
                    }
                </div>
                </div>
            }
        </div>
    )
}

export default PGNEET