/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { auth } from '@/lib/firebase';
import { 
    RecaptchaVerifier,
    signInWithPhoneNumber,
    onAuthStateChanged,
    signInWithEmailAndPassword 
} from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { ChevronLeft } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';


const LoginForm = () => {

    const router = useRouter()

    const setUser = useUserStore(state=>state.setUser)

    const {toast} = useToast()
    const [step, setStep] = React.useState(1)
    const [phone, setPhone] = React.useState('')
    const [code, setCode] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [captcha, setCaptcha] = React.useState(null)


    const generateRecaptcha = async () => {
            let newCaptcha = new RecaptchaVerifier(auth,'recaptcha', {
                'size': 'invisible',
                'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
                }
            })
            setCaptcha(()=>newCaptcha)
            return newCaptcha
    }


    const onSignInSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let tempCaptcha = captcha
        if(tempCaptcha==null) tempCaptcha= await generateRecaptcha()
        signInWithPhoneNumber(auth, '+91'+phone, tempCaptcha)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            toast({
                title: 'OTP sent to ' + phone,
            })
            setStep(2)
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            toast({
                title: 'OTP not sent',
                variant:"destructive"
            })
            setLoading(false)
        });
        
    }

    const onCodeSubmit = async () => {
        setLoading(true)
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(code).then((result) => {
            const user = result.user;
            setLoading(false)
            
            fetch('/api/auth/login',{
                method:'POST',
                body:JSON.stringify({user:user}),
            }).then((res)=>{
                const data = res.json()
                if(data.success){
                    user.subscription = data.subscription
                    setUser(user)
                    router.push('/home')
                }
                else router.refresh()
            })       
        })
        .catch((error) => {
            console.error("Error: ",error);
            toast({
                title: 'OTP not verified',
                variant:"destructive"
            })
            setVerifyLoading(false)
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetch('/api/auth/login',{
                    method:'POST',
                    body:JSON.stringify({user:user}),
                }).then((res)=>{
                    console.log(res.json())
                })
                setUser(user)
            } else {

            }
        });
    },[])



    return (        
        <>
        {
        step==1 && 
        <div className='w-full h-full  flex flex-col justify-center items-center p-4'>
            <h1 className='font-bold text-xl text-center'>LOGIN</h1>
            <div className='flex flex-col gap-y-4 items-center justify-between mt-10'>
                <p className='text-center max-sm:text-sm'>India’s first Premier <span className='font-bold text-nowrap'>Medical Community app</span>,<br/>connecting healthcare experts seamlessly </p>
                <p className='flex gap-x-2 items-center'>
                    <span className='text-sm font-semibold'>MADE IN BHARAT</span>
                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0898 0.943199C9.8005 0.643439 9.45595 0.405678 9.07616 0.243747C8.69638 0.0818217 8.28892 -0.00103676 7.87762 9.79147e-06C7.46626 -0.00103676 7.05887 0.0818217 6.67909 0.243747C6.2993 0.405678 5.95474 0.643439 5.66546 0.943199L5.48899 1.13054L5.31252 0.949653C4.72747 0.350023 3.93401 0.0131563 3.10666 0.0131563C2.27932 0.0131563 1.48585 0.350023 0.900804 0.949653C0.323411 1.55346 0 2.36524 0 3.21073C0 4.05623 0.323411 4.86802 0.900804 5.47179L5.16757 9.85826C5.25618 9.94903 5.37631 10 5.5016 10C5.62683 10 5.74702 9.94903 5.83563 9.85826L10.1024 5.47179C10.68 4.86601 11.0023 4.0519 11 3.20485C10.9977 2.3578 10.6707 1.54559 10.0898 0.943199Z" fill="url(#paint0_linear_300_1994)"/>
                        <defs>
                            <linearGradient id="paint0_linear_300_1994" x1="5.5" y1="0" x2="5.5" y2="10" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#706F6F"/>
                                <stop offset="0.9999" stopColor="#312626"/>
                                <stop offset="1" stopColor="#D6D3D3"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </p>
            </div>
            <form className='w-full max-w-[400px] flex flex-col gap-y-6 mt-12' onSubmit={(e)=>onSignInSubmit(e)}>
                <Input type="text" placeholder="Phone Number" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                <Button className="rounded-full w-full" disabled={phone.length!=10} loading={loading}>Continue</Button>
            </form>
            <p className='text-center text-xs mt-5'>By Clicking, I accept the terms of service and privacy policy</p>

            <p className='text-sm mt-[80px]'>Don’t have an account? <span className='text-primary font-semibold'>Sign Up</span></p>
        </div>}
        <div id="recaptcha"></div>
        {
            step==2 && 
            <div className='w-full h-auto py-[100px]  flex flex-col justify-center items-center p-4 max-w-[400px] relative'>
                <div className='absolute left-0 top-0 bg-neutral-100 rounded-full text-sm font-normal flex items-center gap-x-2 p-1 px-3 cursor-pointer' onClick={()=>{setStep(1);setCode("")}}><ChevronLeft/> Go back</div>
                <div className='w-full text-xl font-bold text-center flex items-center justify-center relative'>
                    Enter OTP
                </div>
                <div className='w-full mt-10'>
                    <InputOTP maxLength={6} containerClassName="justify-between w-full" value={code} onChange={(value) => setCode(value)} >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="border-border bg-neutral-50" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={1} className="border-border bg-neutral-50" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={2} className="border-border bg-neutral-50" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3} className="border-border bg-neutral-50" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={4} className="border-border bg-neutral-50" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={5} className="border-border bg-neutral-50" />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className='w-full mt-10'>
                    <Button onClick={onCodeSubmit} disabled={code.length!=6} loading={loading} className="rounded-full w-full">Verify OTP</Button>
                </div>
            </div>
        }
        </>
    )
}

export default LoginForm