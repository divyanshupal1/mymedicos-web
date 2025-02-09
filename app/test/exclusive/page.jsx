/* eslint-disable react-hooks/exhaustive-deps */
import LoadingScreen from '@/components/ui/loading-screen'
import React from 'react'
import { UpgradePlan } from '../components/defaultPages'
import dynamic from 'next/dynamic'
import { decodeToken } from '@/lib/getDecodedToken'
import admin from '@/lib/firebase_admin'

const TestPage = dynamic(() => import('./testpage'),{
  loading: () => <LoadingScreen/>
})

const Test = async ({searchParams}) => {

  const {course,quiz,type,name} = await searchParams
  const {token,error} = await decodeToken()

  if(!course || !quiz || !type) return <div>Invalid Request</div>
  if(error || !token) return <div>{error}</div>

  const quizDoc = await admin.firestore().collection('Exclusive_Course').doc(course.split("-").pop()).collection(type).doc(quiz).get()
  if(!quizDoc.exists) return <div>Quiz not found</div>
  const quizData = quizDoc.data()

  
  if(quizData.paid){
    const subscriptionDoc = await admin.firestore().collection('SubscribedUsers').doc(token.phoneNumber).get()
    const subscription = subscriptionDoc.data()?.Exclusive
    const subscibedCourses = Object.keys(subscription)

    if(subscibedCourses.indexOf(course)==-1) return <UpgradePlan url={`exclusive/mycourses/${course}`}/>

    const startDate = new Date(subscription.starting);
    const today = new Date();
    startDate.setMonth(startDate.getMonth() + subscription.Duration);

    const isExpired = startDate < today;

    if(isExpired) return <UpgradePlan url={`exclusive/mycourses/${course}`}/>
  }

  const progressDoc = await admin.firestore()
                              .collection('QuizProgress')
                              .doc(token.phoneNumber)
                              .collection('Exclusive')
                              .doc(course)
                              .collection(type)
                              .doc(quiz)
                              .get()
  if(!progressDoc.exists){
    await admin.firestore()
              .collection('QuizProgress')
              .doc(token.phoneNumber)
              .collection('Exclusive')
              .doc(course)
              .collection(type)
              .doc(quiz)
              .set({progress:{},submissions:{}})
  }

  const progressData = progressDoc.data() || {progress:{},submissions:{}}
  if(quizData.Data.length == 0) return <div>This quiz have no questions</div>

  return (
    <TestPage  
      quizData={JSON.stringify(quizData)} 
      progressData={JSON.stringify(progressData)}
      quizInfo={JSON.stringify({course,quiz,type,name})}
    />
  ) 
}

export default Test