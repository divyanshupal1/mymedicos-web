import admin from '@/lib/firebase_admin'
import React from 'react'
import QuizList from '../components/quiz_list'

const GTpage = async () => {
  let quizes =[]
  const quizSnapShot = await admin.firestore().collection('PGupload').doc('Weekley').collection('Quiz').where('speciality','==','Exam').get()
  quizSnapShot.forEach((doc) => {
      quizes.push({...doc.data(),Data:null})
  })

  return (
    <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
      <div className='mt-[5%]'>
        <div className='text-[#35AA86] font-bold text-lg'>Grand Test</div>
      <div className=''></div>
      </div>
      <QuizList quizes={JSON.stringify(quizes)} category={"gt"} section={'pgneet'}/>
    </div>
  )
}

export default GTpage