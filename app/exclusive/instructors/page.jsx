import admin from '@/lib/firebase_admin'
import React from 'react'
import { InstructorCard } from '../components/instructor_card'

const InstructorsPage = async () => {
  const instructorDocs = await admin.firestore().collection('MentorRegistration').get()
  const instructors = instructorDocs.docs.map(doc => ({...doc.data(),DocID:doc.id}))
  return (
    <div className='w-full p-4 max-w-[1900px] mx-auto '>
      <h1 className='text-2xl font-medium text-left'>Instructors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5 '>
      {
        instructors.map(instructor => <InstructorCard key={instructor.DocID} {...instructor}/>)
      }
      </div>
    </div>
  )
}

export default InstructorsPage