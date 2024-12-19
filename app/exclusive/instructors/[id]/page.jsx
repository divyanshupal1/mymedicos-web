/* eslint-disable @next/next/no-img-element */
import React from 'react'
import CourseCard from '../../components/course_card'
import admin from '@/lib/firebase_admin'

const InstructorDetails = async ({params}) => {
    const instructorId = params.id

    const instructorDoc = await admin.firestore().collection('MentorRegistration').doc(instructorId).get()
    const instructor = instructorDoc.data()

    const coursesDocs = await admin.firestore().collection('Exclusive_Course').where('instructorId','==',instructorId).get()
    const courses = coursesDocs.docs.map(doc => ({...doc.data(),id:doc.id}))

  return (
    <div className='mt-3'>
        <div className='flex flex-col gap-4 relative'>
            <img className='w-full min-h-[200px] aspect-[7/1] object-cover' src='https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg' alt='cover-image'/>

            <div className='absolute flex justify-start items-end top-[70%] left-1/2 transform -translate-x-1/2  rounded-lg  w-full max-w-[1200px]'>
                <div className='w-[200px] aspect-square rounded-full overflow-hidden border-[8px] border-white'>
                    <img src={instructor.Profile} alt={instructor.Name} className='w-full h-auto'/>
                </div>
                <div className='w-3/4 p-5'>
                    <h1 className='text-2xl font-medium'>{instructor.Name}</h1>
                    <p className='text-lg max-w-[800px]'>{instructor.Bio}</p>
                </div>
            </div>
        
        </div>
        <div className='mt-[250px]'>
            <h2 className='text-xl font-medium pl-4'>Courses by {instructor.Name}</h2>
        </div>
        <div className='flex flex-wrap gap-4 mt-5 p-5'>
            {
                courses.map(course => <CourseCard key={course.id} courseData={JSON.stringify(course)}/>)
            }
        </div>
    </div>
  )
}

export default InstructorDetails