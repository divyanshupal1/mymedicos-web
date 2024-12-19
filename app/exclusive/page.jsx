import React from 'react'
import { ExclusiveCarousel } from './components/exclusive_carousel'
import CategoriesSlider from './components/categories_slider'
import RecommendedCourses from './components/recommended_courses'
import { useUserStore } from '@/store/userStore'
import admin from "@/lib/firebase_admin"
import Link from "next/link"


const ExclusivePage = async () => {
    const doc = await admin.firestore().collection("ExamCourses").doc("q0X1FqJiUqk0hYIuYlZh").get()
    const {exams} = doc.data()
    return (
        <div className='w-full h-screen'>
            <div className='w-full h-auto'>
                <ExclusiveCarousel/>
            </div>
            <div className=''>
                <div className='w-auto overflow-x-auto ml-4 custom-scroll pb-2'>
                    <CategoriesSlider exams={JSON.stringify(exams)}/>
                </div>
            </div>
            <div className='w-full p-[50px]'>
                <div>
                    <h1 className='font-semibold text-2xl'>Recommended</h1>
                    <h6 className='text-gray-700'>We knou best things for you, Here are some top picks</h6>
                </div>

                <div className='mt-4'>
                    <RecommendedCourses/>
                </div>
            </div>
        </div>
  )
}

export default ExclusivePage