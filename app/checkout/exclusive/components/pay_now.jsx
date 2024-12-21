"use client"
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PayNow = ({amount, order_id, currency}) => {
    const router = useRouter()
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

        const options = {
            "key": "rzp_test_zK3Nwtz9le5dPW", // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency,
            "name": "mymedicos",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                axios.post(`/api/exclusive/callback/`, {
                    "razorpay_payment_id": response.razorpay_payment_id,
                    "razorpay_order_id": response.razorpay_order_id,
                    "razorpay_signature": response.razorpay_signature,
                    "orderID": order_id
                }).then((res) => {
                    router.refresh()
                })
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
    
    return (
        <div className='mt-auto p-4'>
            <h1 className='font-semibold text-center'>Total Amount: Rs. {amount/100}</h1>
            <button id="rzp-button1" className='bg-blue-500 p-3 text-white w-full max-w-xl rounded-full mx-auto mb-2' onClick={displayRazorpay}>Pay Now</button>
        </div>
    )
}

export default PayNow