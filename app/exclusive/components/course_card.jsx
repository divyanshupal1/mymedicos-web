/* eslint-disable @next/next/no-img-element */
"use client"
import { Book, Star, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CourseCard = ({courseData,mycourse}) => {
    const course = JSON.parse(courseData)
    console.log(course)
    return (
        <div className="max-w-sm bg-card min-w-sm grow px-4 pt-4 pb-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 relative border">
            {/* <h3 className="mb-3 text-xl font-semibold text-cyan-700">{course.name}</h3> */}
            <div className="relative mb-4">
                <img className="w-full min-h-[40px] rounded-xl" src={course.cover} alt="Colors" />
                {
                    course.subscription ?
                    <CourseValidation subscription={course.subscription} />
                    : <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{course.premium_status?"Premium":"Free"}</p>
                }
            </div>
            <Link href={`/exclusive/${mycourse? "mycourses":"courses"}/${course.id}`} className=" text-gray-800 dark:text-gray-100 hover:text-blue-500 hover:underline text-2xl font-bold cursor-pointer">{course.title}</Link>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{course.description}</p>
            <div className="my-4 space-y-1">
                <div className="flex space-x-2 items-center">
                    <Star className="size-5 text-yellow-400" />
                    <p>Ratings : {course.rating_avg} ({course.rated_by})</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <Book className="size-5 text-indigo-600" />
                    <p>Subject : {course.subject}</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <User className="size-5 text-indigo-600" />
                    <p>Author : {course.name}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard

const CourseValidation = ({ subscription }) => {
    const startDate = new Date(subscription.starting);
    const today = new Date();
    startDate.setMonth(startDate.getMonth() + subscription.Duration);

    const isExpired = startDate < today;

    return (
        <div className='absolute rounded-full overflow-hidden top-0'>
            {isExpired ? (
                <span className="text-red-50 bg-red-600 p-1 px-2">Expired</span>
            ) : (
                <span className="text-green-50 p-1 px-2 bg-green-600">Valid till: {startDate.toLocaleDateString()}</span>
            )}
        </div>
    );
};