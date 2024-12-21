/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { FaBook, FaStar } from "react-icons/fa6";
import admin from "@/lib/firebase_admin";

const CourseBanner = async ({courseId}) => {
    const courseDoc = await admin.firestore().collection('Exclusive_Course').doc(courseId).get()
    const course = courseDoc.data()

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-md relative">
            <img
                src={course.cover}
                alt={course.title}
                className="w-full h-56 object-cover rounded-lg"
            />
            <p className="absolute top-0 z-10 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                {course.premium_status ? "Premium" : "Free"}
            </p>
            <div className="w-full h-full p-4 absolute flex flex-col justify-end bottom-0 bg-gradient-to-tr from-black/90 to-transparent drop-shadow-sm">
                <h3 className="font-medium text-lg text-neutral-100 max-w-3xl truncate">{course.title}</h3>
                <p className="text-sm text-neutral-100 max-w-3xl truncate">{course.description}</p>
                <div className="mt-2 flex gap-x-3 items-center text-neutral-200">
                    <div className="flex space-x-2 items-center">
                        <FaStar className="size-5 text-yellow-400" />
                        <p>
                            {course?.rating_avg} ({course?.rated_by})
                        </p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <FaBook className="size-5 text-blue-500" />
                        <p>{course.subject}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseBanner