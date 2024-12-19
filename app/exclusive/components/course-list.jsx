"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CourseCard from './course_card'

const CourseList = ({courses}) => {
    courses = JSON.parse(courses)
    const selected = useSearchParams().get('exam')
    return (
        <div className='w-full flex flex-wrap gap-4 p-4'>
            {   
                selected &&
                courses.filter(course => course.exam === selected).map(course => 
                    <CourseCard key={course.id} courseData={JSON.stringify(course)} />
                )
            }{
                !selected &&
                courses.map(course => 
                    <CourseCard key={course.id} courseData={JSON.stringify(course)} />
                )
            }
        </div>
    )
}

export default CourseList