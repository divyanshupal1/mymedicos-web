import admin from '@/lib/firebase_admin'
import { decode } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import React from 'react'
import CourseCard from './course_card'

const RecommendedCourses = async () => {
    const token = cookies().get('authtoken').value
    const decoded = decode(token)
    const interests = decoded.Interests || ['Dermatology']
    const coursesDocs = await admin.firestore().collection('Exclusive_Course').where('subject','in',interests).limit(6).get()
    const courses = coursesDocs.docs.map(doc => ({...doc.data(),id:doc.id}))
    //console.log(courses)
  return (
    <div>
      {
        courses.map((course,index)=>{
          return <CourseCard key={index} courseData={JSON.stringify(course)}/>
        })
      }
    </div>
  )
}

export default RecommendedCourses