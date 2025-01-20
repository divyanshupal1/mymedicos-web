/* eslint-disable @next/next/no-img-element */
"use client"
import { Book, Star, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaStar,FaStarHalfAlt,FaBook } from 'react-icons/fa'

const CourseCard = ({courseData,mycourse}) => {
    const course = JSON.parse(courseData)
    const router = useRouter()

    const handleClick = () => {
        router.push(`/exclusive/${mycourse? "mycourses":"courses"}/${course.title.replaceAll(" ","-")}-${course.id}`)
    }

    return (
        <div onClick={handleClick} className="max-w-sm cursor-pointer bg-card min-w-sm grow rounded-xl shadow-lg transform hover:scale-105 transition duration-500 relative border overflow-hidden">
            {/* <h3 className="mb-3 text-xl font-semibold text-cyan-700">{course.name}</h3> */}
            <div className="relative aspect-[1/0.46]">
                <img className="w-full h-full" src={course.cover} alt="Colors" />
                {
                    course.subscription ?
                    <CourseValidation subscription={course.subscription} />
                    : <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">{course.premium_status?"Premium":"Free"}</p>
                }
            </div>
            <div className='p-4 pb-0'>
                <Link href={`/exclusive/${mycourse? "mycourses":"courses"}/${course.title.replaceAll(" ","-")}-${course.id}`} className=" text-gray-800 dark:text-gray-100 hover:text-blue-500 hover:underline text-xl font-bold cursor-pointer line-clamp-2">{course.title}</Link>
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">{course.description}</p>
                <div className="my-4 space-y-2">
                    <div className="flex space-2 items-center gap-x-2">
                        <RenderStars rating={course.rating_avg || 0} />
                        {course.rating_avg} ({course.rated_by})
                    </div>
                    <div className="flex space-x-2 items-center">
                        <FaBook className="size-5 text-indigo-600" />
                        <p>{course.subject}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard

const CourseValidation = ({ subscription }) => {
    const startDate = new Date(subscription.starting);
    const today = new Date();
    startDate.setMonth(startDate.getMonth() + parseInt(subscription.Duration));

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

const RenderStars = ({rating}) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5; 

    return (
        <div className="flex space-x-1 items-center">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className="text-yellow-400" />
            ))}
            {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        </div>
    );
};