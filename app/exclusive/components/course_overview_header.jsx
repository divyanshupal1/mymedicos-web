/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useRef } from 'react'
import { FaStar, FaBook } from 'react-icons/fa'

const CourseOverviewHeader = ({ title, rated_by, rating_avg, subject, description, cover }) => {
    const container = useRef(null)
    const bg = useRef(null)

    useEffect(() => {
        bg.current.setAttribute('style',`height:${container.current.clientHeight+100}px`)
    }, [])

    return (
        <>
        <div ref={bg} className='max-md:hidden absolute top-0 left-0 w-full bg-green-200 dark:bg-green-800 p-1 -z-10'>

        </div>
        <div className='w-full text-green-950 dark:text-green-50' ref={container}>
            <div className="w-full min-h-56 rounded-lg overflow-hidden shadow-md relative md:hidden mb-4">
                <img
                    src={cover}
                    alt={title}
                    className="w-full h-56 object-cover rounded-lg"
                />
            </div>
            <div className="flex flex-col md:p-6 ">
                <div className="w-full flex flex-col justify-end  drop-shadow-sm">
                    <h1 className="font-medium text-2xl max-w-2xl text-green-950 dark:text-green-50">{title}</h1>
                    <div className="mt-2 flex gap-x-3 items-center ">
                        <div className="flex space-x-2 items-center">
                            <FaStar className="size-5 text-yellow-400" />
                            <p>
                                {rating_avg} ({rated_by})
                            </p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <FaBook className="size-5 text-blue-500" />
                            <p>{subject}</p>
                        </div>
                    </div>
                </div>
                <p className="text-base pl-2 max-w-xl mt-4">{description}</p>
            </div>
        </div>
        </>

    )
}

export default CourseOverviewHeader