import admin from '@/lib/firebase_admin'
import React from 'react'
import { InstructorCard } from '../components/instructor_card'

const InstructorsPage = async () => {
  const instructorDocs = await admin.firestore().collection('MentorRegistration').get()
  const instructors = instructorDocs.docs.map(doc => doc.data())
  return (
    <div className='w-full p-4'>
      <h1 className='text-2xl font-medium text-left'>Instructors</h1>
      <div className='flex flex-wrap gap-4 mt-5'>
      {
        instructors.map(instructor => <InstructorCard key={instructor.DocID} {...instructor}/>)
      }
      </div>
    </div>
  )
}

export default InstructorsPage