"use client"
// import { db } from '@/lib/firebase'
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
// import { useSearchParams } from 'next/navigation'
// import React, { useEffect } from 'react'

const Page = () => {
    // const number = useSearchParams().get('number')
    // const subscribe = useSearchParams().get('subscribe') || false

    // useEffect(() => {
    //     const getPlan = async () => {
    //         const docRef = doc(db, 'Subscription', '+918630670454')
    //         const data = await getDoc(docRef)
    //         await setDoc(doc(db, 'Subscription', `+${number}`), subscribe?data.data():{})
    //     }        
    //     getPlan()
    // },[])

    return (
        <div>Page</div>
    )
}

export default Page