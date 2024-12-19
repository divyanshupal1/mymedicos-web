import admin from '@/lib/firebase_admin'
import React from 'react'
import CourseList from './course-list'

const AllCourses = async () => {
    const docs = await admin.firestore().collection("Exclusive_Course").get()
    const courses = docs.docs.map(doc => ({...doc.data(),id:doc.id}))
    return <CourseList courses={JSON.stringify(courses)} />
}

export default AllCourses