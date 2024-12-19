import React from 'react'
import { decodeToken } from '@/lib/getDecodedToken'
import { redirect } from 'next/dist/server/api-utils'
import admin from '@/lib/firebase_admin'
import { permanentRedirect } from 'next/navigation'

const NotePage = async ({params}) => {
  const {id,noteId} = params
  const {token,error} = decodeToken()

  if(error || !token) return <div>{error}</div>

  const nodeDoc = await admin.firestore().collection('Exclusive_Course').doc(id).collection('Notes').doc(noteId).get()
  const note = nodeDoc.data()

  if(!note) return <div>Note not found</div>

  if(note.paid){
      const subscriptionDoc = await admin.firestore().collection('SubscribedUsers').doc(token.phoneNumber).get()
      const subscription = subscriptionDoc.data()?.Exclusive
      const subscibedCourses = Object.keys(subscription)
      if(subscibedCourses.indexOf(id)==-1) return <div className='w-full h-[500px] flex items-center justify-center font-medium text-lg'>Enroll in the course to access the note</div>
  }
  
  permanentRedirect(note.file)
  
  return <div className='w-full h-[500px] flex items-center justify-center font-medium text-lg'>Downloading </div>
}

export default NotePage