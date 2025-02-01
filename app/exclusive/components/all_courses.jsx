import admin from '@/lib/firebase_admin'
import React, { Suspense } from 'react'
import CourseList from './course-list'

const AllCourses = async () => {
    const docs = await admin.firestore().collection("Exclusive_Course").get()
    const courses = docs.docs.map(doc => ({...doc.data(),id:doc.id}))
    return <Suspense fallback={<div>Loading...</div>}><CourseList courses={JSON.stringify(courses)} /></Suspense>
}

export default AllCourses