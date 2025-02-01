import React, { Suspense } from 'react'
import CategoriesSlider from '../components/categories_slider'
import admin from "@/lib/firebase_admin"
import Link from "next/link"
import AllCourses from '../components/all_courses'

const CoursesPage = async () => {
  const doc = await admin.firestore().collection("ExamCourses").doc("q0X1FqJiUqk0hYIuYlZh").get()
  const {exams} = doc.data()

  if (!exams) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full'>
      {/* <div className='w-full font-medium text-2xl p-4 mt-5'>Courses</div> */}
      <div className='mt-4'>
        <div className='w-auto overflow-x-auto ml-4 custom-scroll pb-2'>
          <CategoriesSlider exams={JSON.stringify(exams)} />
        </div>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
        <AllCourses/>
        </Suspense>
      </div>
    </div>
  )
}

const Page = () => {
  return <Suspense fallback={<div>Loading...</div>}><CoursesPage/></Suspense>
}

export default Page