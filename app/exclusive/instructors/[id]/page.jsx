/* eslint-disable @next/next/no-img-element */
import React from 'react'
import CourseCard from '../../components/course_card'
import admin from '@/lib/firebase_admin'
import { FaBook, FaUserTie } from "react-icons/fa6";

const InstructorDetails = async ({ params }) => {
    params = await params
    const instructorId = params.id.split('-').pop()


    const instructorDoc = await admin.firestore().collection('MentorRegistration').doc(instructorId).get()
    const instructor = instructorDoc.data()

    const coursesDocs = await admin.firestore().collection('Exclusive_Course').where('instructorId', '==', instructorId).get()
    const courses = coursesDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }))

    return (
        <div className='mt-3'>
            <div className='flex flex-col justify-center items-center relative'>
                <img className='w-full min-h-[200px] aspect-[7/1] object-cover ' src='https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg' alt='cover-image' />

                <div className=' max-w-[1200px]  w-full'>
                    <div className='flex items-start justify-start  w-full  px-4'>
                        <img src={instructor.profile} alt={instructor.name} className='relative  -mt-[70px] h-auto w-[150px] aspect-square rounded-full overflow-hidden border-[8px] border-white bg-white' />
                        <div className='w-3/4 p-2'>
                            <h1 className='text-2xl font-medium'>{instructor.name}</h1>
                            <p className='text-lg max-w-[800px] relative'>{instructor.bio}</p>
                            <div className='mt-4 flex items-center gap-4 flex-wrap'>
                                <div className="border rounded-full p-1 px-3 bg-secondary flex items-center gap-2 text-sm w-fit">
                                    <FaBook className="h-4 w-4" />
                                    {instructor.educationalQualifications}
                                </div>
                                <div className="border rounded-full p-1 px-3 bg-secondary flex items-center gap-2 text-sm w-fit">
                                    <FaUserTie className="h-4 w-4" />
                                    {instructor.experience}
                                </div>
                                <div className="border rounded-full p-1 px-3 bg-secondary flex items-center gap-2 text-sm w-fit">
                                    {instructor.specialization}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='mt-[50px]'>
                <h2 className='text-xl font-medium pl-4'>Courses by {instructor.name}</h2>
            </div>
            <div className='flex flex-wrap gap-4 mt-5 p-5'>
                {
                    courses.length > 0 ? courses.map(course => <CourseCard key={course.id} courseData={JSON.stringify(course)} />) : <div className='w-full h-[500px] flex items-center justify-center font-medium text-lg'>No courses found</div>
                }
            </div>
        </div>
    )
}

export default InstructorDetails