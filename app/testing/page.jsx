"use client"
import { db } from '@/lib/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'

const Page = () => {

    useEffect(() => {
        const getPlan = async () => {
            // const docRef = doc(db, 'Subscription', '+918630670454')
            // const data = await getDoc(docRef)
            // await setDoc(doc(db, 'Subscription', '+919999999999'), data.data())
        }        
        getPlan()
    },[])

    return (
        <div>Page</div>
    )
}

export default Page