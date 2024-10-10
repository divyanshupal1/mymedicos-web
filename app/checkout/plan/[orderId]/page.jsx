/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react'
import axios from 'axios';
import { FRONTEND_HOST } from '@/app/constants';
import { useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';


function Page({ params }) {

    const [result, setResult] = React.useState(null);
    const [status,setStatus] = React.useState(null);

    React.useEffect(() => {
        axios.get(`/api/plans/details/${params.orderId}`).then((res) => {
            setResult(res.data);
        })
    },[params.orderId,status])

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, order_id, currency } = result;

        const options = {
            "key": "rzp_test_zK3Nwtz9le5dPW", // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency,
            "name": "mymedicos",
            "description": `Order for ${result.user}`,
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                axios.post(`/api/plans/callback/`, {
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_signature": response.razorpay_signature,
                    "orderID": params.orderId
                }).then((res) => {
                    if (res.data.success) {
                        setStatus("success")
                    } else {
                        setStatus("failed")
                    }
                })
            },
            "prefill": {
                "contact": result.user
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
        });
        paymentObject.open();
    }
    
    if(!result) return <div>Loading...</div>
    const planID = result.plan.planID.split("-")[0].toUpperCase() +" " + result.plan.planID.split("-")[1].toUpperCase();
    const price = result.plan?.coupon?.discount ? result.amount/(100-result.plan?.coupon?.discount) : result.amount/100;
    return (
        <>
            <div className='w-full h-screen flex flex-col justify-between '>
                <div>
                    <div className='w-full p-3 py-4 shadow-md flex justify-between'>
                        <div>
                            <img src='/images/logo.svg' className='h-7' alt='logo' />
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <div className='font-medium '>Checkout</div>
                            <div className='text-sm'>{params.orderId}</div>
                        </div>
                    </div>
                    <div className=' p-3 bg-neutral-200  rounded-lg mt-3 mx-auto max-w-xl'>
                        <div className='font-lg mb-4'>Plan Details</div>
                        <div className='flex justify-between border-b border-neutral-500 py-2'>
                            <div className='font-sm'>Plan</div>
                            <div>{planID}</div>
                        </div>
                        <div className='flex justify-between border-b py-2 border-neutral-500'>
                            <div className='font-sm'>Duration</div>
                            <div>{result.plan.duration} Months</div>
                        </div>
                        <div className='flex justify-between border-b py-2 border-neutral-500'>
                            <div className='font-sm'>Coupon</div>
                            <div>{result?.plan?.coupon?.couponCode || "no coupon used"}</div>
                        </div>
                        <div className='flex justify-between py-2 border-neutral-500'>
                            <div className='font-sm'>Phone Number</div>
                            <div>{result.user}</div>
                        </div>
                    </div>
                    {
                        (status=="failed") || result.status=='pending' &&
                        <div className=' p-3 bg-neutral-200  rounded-lg mt-3 mx-auto max-w-xl'>
                            <div className='font-lg mb-4'>Price Details</div>
                            <div className='flex justify-between border-b py-2 border-neutral-500'>
                                <div className='font-sm'>Price</div>
                                <div>₹ {price}</div>
                            </div>
                            <div className='flex justify-between border-b py-2 border-neutral-500'>
                                <div className='font-sm'>Discount ({result.plan?.coupon?.discount||0}%)</div>
                                <div>₹ {(price-(result.amount/100)).toFixed(2)}</div>
                            </div>
                            <div className='flex justify-between py-2'>
                                <div className='font-sm'>Total</div>
                                <div>₹ {result.amount/100}</div>
                            </div>
                        </div>
                    }
                    {
                        result.status=='success' &&
                        <>
                        <div className={`p-3 rounded-lg mt-3 mx-auto bg-green-500/20 max-w-xl`}>
                            <img src='/images/payment_success.png' className='min-w-[100px] w-full max-w-[200px] mx-auto' alt='logo' />
                            <div className='font-xl mt-4 text-center text-green-400'>Payment Successful</div>
                            <div className='font-xl my-3 text-center text-green-400'>Explore mymedicos premium!</div>
                        </div>
                        <div className='w-full flex justify-center mt-4'>
                            <Link href='/home' className={cn(buttonVariants({variant:"default"}))}>Go Back to Home</Link>
                        </div>
                        </>
                    }{
                        status=="failed" && result.status=='pending' &&
                        <div className={`p-3 rounded-lg mt-3 mx-auto bg-red-500/20 mb-[100px] max-w-xl`}>
                            <img src='/images/payment_failed.png' className='min-w-[100px] w-full mt-4 max-w-[100px] mx-auto' alt='logo' />
                            <div className='text-xl mt-4 text-center text-red-300'>Payment Failed</div>
                            <div className='text-xs my-3 text-center text-red-200 max-w-sm mx-auto'>If money deducted it will be automatically updated within few minutes or you can retry payment.</div>
                        </div>
                    }
                </div>


                {
                    (status==undefined||status==null||status=="failed") && result.status!='success' &&
                    <div className='w-full fixed bottom-0 flex items-center justify-center flex-col  backdrop-blur-md rounded-lg'>
                        <div className='flex flex-col justify-center items-center mb-4 mx-auto'>
                            <div className='font-medium mt-2'>Total Amount: ₹{result.amount/100}</div>
                        </div>
                        <button id="rzp-button1" className='bg-blue-500 p-3 text-white w-full max-w-xl rounded-full mx-auto mb-2' onClick={displayRazorpay}>Pay Now</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Page
