import React from 'react'
import { decodeToken } from '@/lib/getDecodedToken.js'
import { permanentRedirect } from 'next/navigation'
import admin from '@/lib/firebase_admin'
import CourseCard from '../components/course_card'

const MyCoursesPage = async () => {
  const {token, error} = decodeToken()
  if(error || !token) permanentRedirect('/login')
  
  const subscriptions = await admin.firestore().collection('SubscribedUsers').doc(token.phoneNumber).get()
  const courses = subscriptions.data().Exclusive

  const exclusiveIds = Object.keys(courses)

  const courseDetails = await Promise.all(exclusiveIds.map(async (id) => {
    const doc = await admin.firestore().collection('Exclusive_Course').doc(id).get()
    return {...doc.data(),id:doc.id,subscription:courses[id]}
  }))

  return (
    <div>
      <h1 className='text-xl font-semibold p-5'>Your Courses</h1>
      <div className='w-full flex flex-wrap gap-4 p-4'>
        {
          courseDetails.length === 0 ? <div className='w-full h-[500px] flex items-center justify-center font-medium text-lg'>No courses found</div> :
          courseDetails.map((course, index) => (
            <CourseCard key={index} mycourse courseData={JSON.stringify(course)} />
          ))
        }
      </div>
    </div>
  )
}

export default MyCoursesPage