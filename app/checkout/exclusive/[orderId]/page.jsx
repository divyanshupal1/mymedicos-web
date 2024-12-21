/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { decodeToken } from '@/lib/getDecodedToken.js'
import { permanentRedirect } from 'next/navigation'
import admin from '@/lib/firebase_admin'
import { Logo } from '@/lib/icons'
import CourseBanner from '../components/course_banner'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PayNow from '../components/pay_now'

const ExclusiveCheckout = async ({ params }) => {
    const { token, error } = decodeToken()
    if (error || !token) permanentRedirect('/auth/login')

    const orderDoc = await admin.firestore().collection('PlansOrders').doc(params.orderId).get()
    const order = orderDoc.data()

    if (order.plan.phone !== token.phoneNumber) permanentRedirect('/auth/login')

    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='w-full shadow-sm px-4 py-4 flex items-center justify-between'>
                <Logo className='h-[30px] w-auto' />
                {
                    token.doc.Profile ?
                        <img src={token.doc.Profile} className='h-[30px] w-[30px] rounded-full' alt={token.doc.Name} />
                        : <div className='h-[30px] w-[30px] rounded-full bg-gray-300 flex items-center justify-center'>{token.doc.Name.substring(0, 2).toUpperCase()}</div>
                }
            </div>
            <div className='w-full flex flex-col items-start justify-center p-2'>
                <h1 className='font-semibold text-xl p-2'>Checkout</h1>

                <div className='w-full flex flex-col items-start justify-center p-2'>
                    <CourseBanner courseId={order.plan.courseId} />
                </div>
                <div className='w-full p-2'>
                    <div className='text-lg'>
                        <span>Duration: </span>
                        <span className='font-semibold'>{order.plan.duration} months</span>
                    </div>
                </div>

            </div>

                { 
                    order.status === 'success' ? 
                    <PaymentCompleted courseId={order.plan.courseId} /> 
                    :
                    <PayNow order_id={params.orderId} currency={order.currency} amount={order.amount}/>
                }

        </div>
    )
}

export default ExclusiveCheckout


const PaymentCompleted = ({courseId}) => {
    return (
        <div className='w-full'>
            <div className={`p-3 rounded-lg mt-3 mx-auto bg-green-500/10 max-w-xl`}>
                <img src='/images/payment_success.png' className='min-w-[100px] w-full max-w-[200px] mx-auto' alt='logo' />
                <div className='font-xl mt-4 text-center text-green-600'>Payment Successful</div>
                <div className='font-xl my-3 text-center text-green-600'>You can explore your course!</div>
                <div className='w-full flex justify-center mt-4'>
                    <Link href={`/exclusive/mycourses/${courseId}`} className={cn(buttonVariants({ variant: "default" }))}>Take me to my course</Link>
                </div>
            </div>

        </div>
    )
}