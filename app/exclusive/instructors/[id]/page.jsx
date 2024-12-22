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
        <div className='flex flex-col justify-center items-center relative'>
            <img className='w-full min-h-[200px] aspect-[7/1] object-cover' src='https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg' alt='cover-image'/>

            <div className=' max-w-[1200px]  w-full'>
                <div className='flex items-end justify-start  w-full'>
                    <img src={instructor.Profile} alt={instructor.Name} className='relative  -mt-[80px] h-auto w-[200px] aspect-square rounded-full overflow-hidden border-[8px] border-white'/>
                    <div className='w-3/4 p-5'>
                        <h1 className='text-2xl font-medium'>{instructor.Name}</h1>                        
                        <p className='text-lg max-w-[800px]'>{instructor.Bio}</p>
                    </div>
                </div>
            </div>
        
        </div>
        <div className='mt-[250px]'>
            <h2 className='text-xl font-medium pl-4'>Courses by {instructor.Name}</h2>
        </div>
        <div className='flex flex-wrap gap-4 mt-5 p-5'>
            {
               courses.length>0 ? courses.map(course => <CourseCard key={course.id} courseData={JSON.stringify(course)}/>) : <div className='w-full h-[500px] flex items-center justify-center font-medium text-lg'>No courses found</div>
            }
        </div>
    </div>
  )
}

export default InstructorDetails