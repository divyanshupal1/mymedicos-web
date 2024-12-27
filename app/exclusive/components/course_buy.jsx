"use client"
import React from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { getLoggedInUser } from '@/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const CourseBuy = ({ m6, m12, m18 ,courseId}) => {
    const [loading, setLoading] = React.useState(false)
    const [selected, setSelected] = React.useState("12")
    const router = useRouter()
    const {toast} = useToast()

    const subscribedCourse = useUserStore(state=>state?.user?.subscription?.Exclusive?.[courseId])
    if(subscribedCourse){
        const today = new Date()
        const start = new Date(subscribedCourse.starting)
        start.setMonth(start.getMonth() + parseInt(subscribedCourse.Duration));
        if(today<start) return <AlreadySubscribed />
    }
    

    const handleEnroll = async () => {
        try{
            setLoading(true)
            const user = await getLoggedInUser()
            if(!user?.data) router.push('/auth/login')

            const order = await axios.post('/api/exclusive/generate',{
                courseId:courseId,
                phone:user.data["Phone Number"],
                duration:selected
            })
            if(order.data?.status!=="success"){
                toast({
                    title: "Error",
                    description:"Something went wrong",
                })
            }
            else{
                router.push(`/checkout/exclusive/${order.data.order_id}`)
            }
            setLoading(false)

        }catch(e){
            console.log(e)
            setLoading(false)
            toast({
                title: "Error",
                description:"Something went wrong",
            })
        }
    }

    return (
        <div className='w-full h-full'>
            
            <div className="w-full flex flex-col mt-6">
                <RadioGroup defaultValue={selected} onValueChange={(val)=>setSelected(val)}  className="w-full space-y-3">
                    <div className="flex items-center space-x-2 w-full">
                        <RadioGroupItem value="6" id="r1" />
                        <Label htmlFor="r1" className="whitespace-nowrap flex items-center justify-between gap-x-3 w-full"><span>6 Months</span> <span className="font-semibold">Rs.{m6}</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="12" id="r2" />
                        <Label htmlFor="r1" className="whitespace-nowrap flex items-center justify-between gap-x-3 w-full"><span>12 Months</span> <span className="font-semibold">Rs.{m12}</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="18" id="r3" />
                        <Label htmlFor="r1" className="whitespace-nowrap flex items-center justify-between gap-x-3 w-full"><span>18 Months</span> <span className="font-semibold">Rs.{m18}</span></Label>
                    </div>
                </RadioGroup>
            </div>
            <Button className="mt-6 w-full" loading={loading} onClick={handleEnroll}>Enroll Now</Button>
            <div className="w-full flex-col mt-6 gap-3 hidden md:flex">
                <div className="w-full flex items-center gap-x-3 text-slate-700 text-sm"><Check size={16} /><span>Full preparation</span></div>
                <div className="w-full flex items-center gap-x-3 text-slate-700 text-sm"><Check size={16} /><span>Doubt Support</span></div>
                <div className="w-full flex items-center gap-x-3 text-slate-700 whitespace-nowrap text-sm"><Check size={16} /><span>30 Days Money Back Guarantee</span></div>
            </div>
        </div>
    )
}

export default CourseBuy

const AlreadySubscribed = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="font-semibold text-lg">You are already subscribed to this course</h1>
        </div>
    )
}