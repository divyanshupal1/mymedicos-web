/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react'
import QuizSidebar from './quiz-sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HiMiniSparkles } from "react-icons/hi2";
import { TbMoodConfuzed } from "react-icons/tb";
import { useUserStore } from '@/store/userStore';
import { doc, getDoc,setDoc, updateDoc} from "firebase/firestore";
import { db } from '@/lib/firebase';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloudDone, IoCloud  } from "react-icons/io5";
import { useToast } from '@/components/ui/use-toast';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { saveProgress, submitQuiz } from '@/actions';
import { useRouter } from 'next/navigation';


const dummyImage =["noimage","https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Quiz%2Fthumbnails%2F6b7d1ffd-7637-4633-9fc8-004702f7ada4No.png?alt=media&token=5e162813-a98b-449c-a07d-e34c5faa1bde"];
const optionList = ['A','B','C','D','E','F','G','H','I','J']

const TestPage = ({quizData,quizInfo,progressData}) => {
    const router = useRouter()
    quizData = JSON.parse(quizData)
    progressData = JSON.parse(progressData)
    const {course,quiz,type,name} = JSON.parse(quizInfo)

    const questions = quizData.Data

    const {toast} = useToast()


    const [synced,setSynced] = useState(1)
    const [answered,setAnswered] = useState(progressData.progress) 
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [score,setScore] = useState(0)
    const [isSubmitted,setIsSubmitted] = useState(false)
    const [submitting,setSubmitting] = useState(false)

    const handleNext = () => {
        if(currentQuestion==total-1) return
        setCurrentQuestion(currentQuestion+1)
    }
    const handlePrev = () => {
        if(currentQuestion==0) return
        setCurrentQuestion(currentQuestion-1)
    }
    const handleAnswer = (value) => {
        if(answered[currentQuestion]!=undefined) return
        setAnswered({...answered,[currentQuestion]:value})
        if(value==questions[currentQuestion].Correct) setScore(score+4)
        else  setScore(score-1)
        setSynced(0)
    }
    const handleSubmission = () => {
        const date = new Date()
        setSubmitting(true)
        setSynced(0)
        const id = crypto.randomUUID()
        submitQuiz(course,quiz,type,{...progressData.submissions,[date.toISOString()]:{result:answered,marks:score,id}})
        .then(()=>{
            setSynced(1)
            setIsSubmitted(false)
            setSubmitting(false)
            setAnswered({})
            toast({
                title: "Quiz Submitted",
                description: "You can now view the results",
                variant: "success"
            })
            router.push(`/exclusive/mycourses/${course}/${type}/${quiz}/${name}`)
        }).catch((err)=>{
            setSynced(0)
            setSubmitting(false)
            setIsSubmitted(false)
            toast({
                title: "Failed Submitting Quiz",
                variant: "destructive"
            })
        })
    }

    useEffect(()=>{
        async function save(){
            setSynced(2)
            const res = await saveProgress(course,quiz,type,answered)
            if(res.success){
                setSynced(1)
            }
            else{
                setSynced(0)
            }
        }
        save()
    },[answered])





    return (
        <div className='w-full min-h-screen h-auto max-lg:h-auto flex items-start justify-start gap-x-2 max-lg:flex-col-reverse'>
            <div className='w-4/12 max-lg:w-full h-full min-h-screen max-lg:min-h-screen sticky top-0 bg-slate-200 rounded-md  flex flex-col gap-y-4 lg:overflow-y-scroll max-lg:overflow-auto max-lg:scroll-hide'>
                <div className='group font-bold text-lg p-4 pb-0 bg-slate-200 bg-opacity-80 backdrop-blur-md sticky top-0 w-full flex justify-between items-center'>
                    {quizData.title}
                    <div className='bg-white p-1 font-normal rounded-full flex items-center gap-x-3 px-3 cursor-pointer'>
                        <span className='text-xs whitespace-nowrap'>
                            {
                                synced==0?
                                <p>progress unsaved</p>
                                :
                                (
                                    synced==1?
                                    <p>progress saved</p>
                                    :
                                    <p>saving progress..</p>
                                )
                            }
                        </span>
                        <span className=''>
                            {
                                synced==0?
                                <IoCloud className='text-red-400 scale-125'/>                       
                                :
                                (
                                    synced==1?
                                    <IoCloudDone className='text-green-600 scale-125'/>
                                    :
                                    <span><AiOutlineLoading3Quarters className='animate-spin text-green-600'/></span>
                                )
                            }
                        </span>
                    </div>
                </div>
                <QuizSidebar questions={questions} answered={answered} score={score} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion}/>
                <div className='sticky bottom-0 mt-auto bg-slate-200 bg-opacity-80 backdrop-blur-md rounded-md p-4'>
                    <div className=''>
                        <div className='font-bold'>Score: {score}</div>
                        <div className='font-bold mt-4'>Answered: {Object.keys(answered).length}</div>
                    </div>
                    <div className='mt-6 w-full'>
                        <Button className="w-full" onClick={handleSubmission} loading={submitting}>Submit Quiz</Button>
                        <div className='text-xs text-neutral-600 text-center w-full mt-2'>Submit the quiz to mark as completed</div>
                    </div>
                </div>
            </div>
            <div className='w-8/12 relative  max-lg:w-full max-lg:min-h-screen  max-lg:overflow-y-scroll h-full flex flex-col p-2 max-lg:scroll-hide'>
                {
                    submitting &&
                    <div className='absolute w-full h-full bg-white/35'>
                        <div className='w-full h-full flex items-center justify-center'>
                            <AiOutlineLoading3Quarters className='animate-spin text-green-600 scale-125'/>
                        </div>
                    </div>
                }
                <div className='font-semibold text-lg mt-2'>Question Number: {currentQuestion+1}</div>
                <div className='pt-4'>
                    <div className='text-lg font-semibold'>{questions[currentQuestion].Question}</div>
                    {questions[currentQuestion].Image!==undefined && dummyImage.includes(questions[currentQuestion].Image)==-1 && <img src={questions[currentQuestion].Image} className='w-auto min-h-[400px] h-1/2 mt-4 mx-auto rounded-lg' alt="Question Image"/>}
                    <div className='grid grid-cols-2 max-md:grid-cols-1 mt-4 gap-x-3 gap-y-4 '>
                            
                            {
                                questions[currentQuestion].options.map((option,index)=>(
                                    <div 
                                        key={index} 
                                        onClick={()=>handleAnswer(index)} 
                                        className={cn(optionVariants({variant: answered[currentQuestion]==undefined?"default":index==questions[currentQuestion].Correct?"correct": answered[currentQuestion]==index?"incorrect":"default"}))}
                                        
                                    >
                                        {optionList[index]}. {option}
                                    </div>
                                ))
                            }
                    </div>             
                </div>
                {
                    answered[currentQuestion]!=undefined &&
                    <div>
                        <div className={`text-lg font-medium mt-4 ml-4 flex items-center gap-x-3 ${answered[currentQuestion]==questions[currentQuestion].Correct?" text-green-600":"text-red-500"}`}>{answered[currentQuestion]==questions[currentQuestion].Correct?<><HiMiniSparkles/> Correct Answer</>:<><TbMoodConfuzed className='scale-[1.5]'/> Wrong Answer</>}</div>
                        <div className='text-lg font-semibold mt-4'>Explanation</div>
                        <div className='p-3 mt-2 bg-neutral-50 rounded-lg mb-16' dangerouslySetInnerHTML={{__html:questions[currentQuestion].Description}}></div>
                    </div>
                }
                <div className='flex gap-x-2 sticky bottom-2 mt-2  w-full justify-between'>
                        <Button onClick={handlePrev} disabled={currentQuestion==0} ><span><ChevronLeft/></span> Previous</Button>
                        <Button onClick={handleNext} disabled={currentQuestion==questions.length-1}>Next <span><ChevronRight/></span></Button>
                </div>
            </div>
        </div>
    )
}

export default TestPage


const parseQuizData = (data) => {
    let quiz=JSON.parse(data)
    const questions = {}
    quiz?.Data?.map((question)=>{
        questions[question.number] = question
    })
    return {questions,total:Object.keys(questions).length,quiz}
}

const getQuizProgress = async (uid,section,quiz_id,quiz,category) => {
    const quizRef = doc(db, "QuizProgress",uid,section, quiz_id);
    const docSnap = await getDoc(quizRef);
    if(!docSnap.exists()){
        await initializeQuizProgress(uid,section,quiz_id,{quiz:{...quiz,Data:null},section,category})
    }
    return docSnap.data()
}
const initializeQuizProgress = async (uid,section,quiz_id,data) => {
    const quizRef = doc(db, "QuizProgress",uid,section, quiz_id);
    return Promise.resolve(setDoc(quizRef,data))
}
const saveQuizProgress = async (uid,section,quiz_id,data) => {
    const quizRef = doc(db, "QuizProgress",uid,section, quiz_id);
    return Promise.resolve(updateDoc(quizRef,data))
}
const optionVariants = cva(
    "cursor-pointer rounded-lg border-2 p-4",{
    variants:{
        variant:{
        correct: 'bg-green-200 border-green-300',
        incorrect: 'bg-red-200 border-red-300',
        default: 'border-neutral-200'
        }
    },
    defaultVariants: 'default'
})

const ResultPage = ({quiz,answers,score}) => {

    return (
        <div className='w-full h-auto flex flex-col gap-x-2'>
            <div className='font-bold text-lg p-4 bg-slate-200 bg-opacity-80 backdrop-blur-md sticky top-0 w-full flex justify-between items-center'>
                {quiz.title}
            </div>
            <div className='p-4 max-md:p-0'>
                <div className='font-bold text-lg'>Your Score: {score}</div>
                <div className='mt-4'>
                    {
                        quiz.Data.map((q,index)=>
                            <div key={index} className='p-4 rounded-lg mt-2'>
                                <div className='font-semibold text-lg'>Q{q.number+1} ).  {q.Question}</div>
                                <div>
                                    {q.Image !==undefined && dummyImage.includes(q.Image)==-1 && <img src={q.Image} className='w-auto h-[400px] mt-4 mx-auto rounded-lg object-contain' alt="Question Image"/>}
                                </div>
                                <div className='grid grid-cols-2 max-md:grid-cols-1 mt-4 gap-x-3 gap-y-4 '>
                                    {
                                        options.map((option,idx)=>(
                                            <div 
                                                key={idx} 
                                                className={cn(optionVariants({variant: answers[q.number]==undefined?"default":option==q.Correct?"correct": answers[q.number]==option?"incorrect":"default"}),"cursor-default")}
                                            >
                                                {option}. {quiz.Data[index][option]}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={`text-lg font-medium mt-4 ml-4 flex items-center gap-x-3 ${answers[q.number]==q.Correct?" text-green-600":"text-red-500"}`}>{answers[q.number]!=undefined?(answers[index]==q.Correct?<><HiMiniSparkles/> Correct Answer</>:<><span className='scale-125 -z-10'><TbMoodConfuzed/></span> Wrong Answer</>):<>Not attempted</>}</div>
                                <div className='text-lg font-semibold mt-4'>Explanation</div>
                                <div className='p-3 mt-2 bg-neutral-50 rounded-lg' dangerouslySetInnerHTML={{__html:quiz.Data[index].Description}}></div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )

}