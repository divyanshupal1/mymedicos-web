"use client"
/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from 'react'
import { usePlansStore } from '@/store/usePlansStore'

const plansl = {
"PGNEET": [
        {
            "Durations": {
                "1": 499,
                "3": 1199,
                "6": 1,
                "9": 2499
            },
            "Recommended": true,
            "PlanThumbnail": "https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Plans%2Fbody-parts.png?alt=media&token=5b2ce1f8-4d59-4b7f-95a8-d5f2aff7237d",
            "Discount_Price": "1",
            "PlanPrice": "749",
            "PlanFeatures": [
                "Conceptual video lectures",
                "QBank 6.0",
                "Test series with 10,000 + Participants",
                "Previous Year Questions",
                "Concise summary of Topics in form of Treasures",
                "Proven effective Rapid Revision Course",
            ],
            "PlanName": "Foundation Plan",
            "planID": "pgneet-standard",
            "PlanTagline": "Cut The Noise"
        },
        {
            "PlanName": "ELITE Plan",
            "PlanThumbnail": "https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Plans%2Fbrain.png?alt=media&token=b43199da-cb12-4384-9506-f7d305ec8914",
            "Durations": {
                "1": 999,
                "3": 2499,
                "6": 4499,
                "9": 5999
            },
            "PlanFeatures": [
                "Conceptual Video Lectures",
                "18000 + questions including clinical, one-liners & PYQ's",
                "1500+ summary charts in the form of treasures",
                "12 Mock Tests with 10,000 + Participants",
                "Option to buy hard copy notes with space to annotate",
                "Concise digital notes based on video lectures"
            ],
            "Discount_Price": "4499",
            "PlanPrice": "1199",
            "Recommended": true,
            "PlanTagline": "Cut The Noise",
            "planID": "pgneet-pro"
        },
        {
            "Durations": {
                "1": 899,
                "3": 2499,
                "6": 4499,
                "9": 6499
            },
            "PlanPrice": "1099",
            "Recommended": true,
            "PlanFeatures": [
                "Unlimited access to Banks & Test only.",
                "QBank 1.0 featuring 18,000 + questions",
                "Test Series with 10,000 + Participants",
                "Previous Year Questions",
                "Concise summary of Topics in form of Treasures",
                "Proven effective Rapid Revision Bank"
            ],
            "PlanThumbnail": "https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Plans%2Fdesign-thinking.png?alt=media&token=b5621e20-4767-470d-9c93-21c393f3ff11",
            "PlanName": "PRO Plan",
            "PlanTagline": "India's Only Clinical QBanks",
            "planID": "pgneet-premium",
            "Discount_Price": "4499"
        },

    ],
"FMGE":[
        {
            "Durations": {
                "1": 499,
                "3": 1199,
                "6": 1899,
                "9": 2499
            },
            "PlanThumbnail": "https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Plans%2Fbrain.png?alt=media&token=d722e910-7dc4-49f5-ab44-18e29d683bc6",
            "PlanPrice": "749",
            "Recommended": false,
            "PlanName": "Foundation Plan",
            "PlanFeatures": [
                "Conceptual video lectures",
                "QBank 6.0",
                "Test series with 10,000 + Participants",
                " Previous Year Questions",
                "Concise summary of Topics in form of Treasures",
                "Proven effective Rapid Revision Course",
                
            ],
            "PlanTagline": "Cut The Noise",
            "planID": "fmge-standard",
            "Discount_Price": "1899"
        },
        {
            "PlanName": "Super ELITE Plan",
            "PlanFeatures": [
                "Conceptual Video Lectures",
                "18000 + questions including clinical, one-liners & PYQ's",
                "1500+ summary charts in the form of treasures",
                "12 Mock Tests with 10,000 + Participants",
                "Option to buy hard copy notes with space to annotate",
                "Concise digital notes based on video lectures"
            ],
            "Recommended": true,
            "planID": "fmge-premium",
            "Durations": {
                "1": 999,
                "3": 2499,
                "6": 4499,
                "9": 5999
            },
            "PlanPrice": "1199",
            "Discount_Price": "999",
            "PlanTagline": "Cut The Noise",
            "PlanThumbnail": "https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Plans%2FWhatsApp%20Image%202024-08-10%20at%2013.59.50_f2eac0c1.jpg?alt=media&token=faa25d4f-f4e3-4475-adf6-ff9f5ad013dc"
        },
    ],
// "NEETSS":[
//         {
//             "PlanName": "Foundation Plan",
//             "PlanThumbnail": "https://firebasestorage.googleapis.com/v0/b/mymedicosupdated.appspot.com/o/Plans%2Falpha-circle-svgrepo-com.svg?alt=media&token=d6daebe3-3438-4156-9b89-bb3633178a93",
//             "Recommended": true,
//             "PlanTagline": "Cut the Noise",
//             "Durations": {
//                 "1": 999,
//                 "3": 1499,
//                 "6": 2999,
//                 "9": 6999
//             },
//             "Discount_Price": "2999",
//             "PlanFeatures": [
//                 "Conceptual Video Lectures",
//                 "18000 + questions including clinical, one-liners & PYQ's",
//                 "1500+ summary charts in the form of treasures",
//                 "12 Mock Tests with 10,000 + Participants",
//                 "Option to buy hard copy notes with space to annotate"
//             ],
//             "PlanPrice": "999",
//             "planID": "neetss-standard"
//         }
//     ]   

}
const planID = ["PGNEET", "FMGE"]

const Plans = () => {

    const [group, setGroup] = React.useState(0)
    const [currentPlan, setCurrentPlan] = React.useState(null)
    const setPlan = (plan) => {
        setCurrentPlan(plan)
    }

    const {plans, fetchPlans} = usePlansStore((state)=>({
        plans:state.plans,
        fetchPlans:state.fetchPlans
    }))
    useEffect(() => {
        if(plans.PGNEET==null) fetchPlans(planID[0])
        if(plans.FMGE==null) fetchPlans(planID[1])
    }, [plans, fetchPlans, group])

    if(plans==null) return <></>

return (
    <>
    <div className='w-full flex flex-col gap-y-6'>
        <div className='text-center text-3xl font-semibold text-[#03755A]'>Choose Your Plan</div>
        <div className='w-full px-5 mb-5 '>
            <div className='w-fit max-w-2xl mx-auto flex justify-between items-center rounded-full border *:text-[#089B88] *:font-medium *:p-2 max-md:*:p-1 max-md:*:px-2 *:px-10 *:rounded-full'>
                {
                    Object.keys(plans)?.map((key, index) => 
                        <div key={index} onClick={()=>setGroup(index)} className={`cursor-pointer ${group==index?"bg-secondary text-white":""}`}>{key}</div>
                    )
                }
            </div>
        </div>
        <div className='w-full'>
            <div className='w-full max-w-7xl p-1 mx-auto flex items-center justify-center gap-x-5 max-md:flex-col gap-y-4'>
                {
                    plans[Object.keys(plans)[group]]?.map((plan, index) =><Plancard key={index} index={index} plan={plan} setPlan={setPlan}/>)
                }
            </div>
        </div>
        
    </div>
    {
        currentPlan && <ExpandedPlan plan={currentPlan} section={Object.keys(plans)[group]}/>
    }

    </>
)

}

export default Plans

import { Button } from '@/components/ui/button'
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import FMGE from '@/app/fmge/page'
import { Expand } from 'lucide-react'

const Plancard = ({plan,index,setPlan}) => {

    return (        
        <div id='plancards' className={`card p-6  rounded-xl border flex flex-col gap-y-7  w-full max-w-sm ${index==1?"text-white bg-gradient-to-br from-[#6ECFC2] to-[#1E5746]":"bg-white text-[#03755A]"}`}>
            <div className={`p-2 px-5 rounded-md border-2 font-medium w-fit mx-auto ${index==1?"border-white":"border-border"}`}>{plan.PlanName}</div>
            <div className={`rounded-md w-fit mx-auto -mt-5`}>{plan.PlanTagline}</div>
            <div className='text-2xl flex flex-col font-bold text-center mx-auto'> 
                ₹{plan.Discount_Price} 
                {/* <span className='line-through text-sm'> ₹{plan.Discount_Price}</span> */}
            </div>
            <div className='features flex flex-col  max-w-xs mx-auto'>
                {
                    plan.PlanFeatures.map((feature, index) => <div key={index} className='text-sm flex gap-x-3 items-start'><span className='scale-125 pt-1'><MdOutlineCheckCircleOutline/></span><span>{feature}</span></div>)
                }
            </div>    
            <div className='w-full flex items-center justify-center'>
                <Button className="mx-auto h-[45px] w-full max-w-[150px]" onClick={()=>setPlan(plan)} >Choose Plan</Button>
            </div>
        </div>
    )
}

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const ExpandedPlan = ({plan,section}) => {
    const router = useRouter()
    const user = useUserStore(state=>state.user)

    const [duration, setDuration] = React.useState("6")
    const [loading, setLoading] = React.useState(false)

    const handlePurchase = async () =>{
        //console.log(user)
        if(user==null) router.push('/login')
        else{
            setLoading(true)
            const res = await axios.post('/api/plans/generate', {
                section:section,
                phone:user.phoneNumber,
                planID:plan.planID,
                duration:duration
            })
            if(res.data.status=="success"){
                router.push(`/checkout/plan/${res.data.order_id}`)

            }
            else{
                //console.log(res.data.status,res.data)
                setLoading(false)
            }
        
        }
    }
    return (
        <>
        <div className='w-full flex items-center justify-between h-auto p-4 bg-green-50 mt-5' id='plan-duration'>
            <div className='w-1/2 hidden md:block flex-shrink'>
                <div className='text-2xl font-semibold text-[#03755A]'>{plan.PlanName}</div>
                <img src={plan.PlanThumbnail} alt={plan.PlanName} className='mx-auto h-auto w-auto flex-shrink md:max-w-sm lg:max-w-md object-contain'/>
            </div>
            <div className='w-full md:w-1/2'>
                <RadioGroup defaultValue={"6"} onValueChange={(val)=>setDuration(val)} className="mx-auto">
                    { plan.Recommended && Object.keys(plan.Durations).map((key, index) => 
                        <div key={index} className="flex max-w-md min-w-[400px]  items-center space-x-2 border rounded-lg relative shadow-md bg-white">
                            <RadioGroupItem value={key} id={key} className="ml-4"/>
                            <Label htmlFor={key} className='w-full flex text-base justify-between items-center p-5 py-6 '>
                                <span>{key} Months</span>
                                <span>₹{plan.Durations[key]}</span>
                            </Label>
                            {key=="6" && <div className='absolute text-primary-foreground top-0 bg-primary p-0.5 px-2 text-sm rounded-b-lg left-1/2 -translate-x-1/2'>
                                Recommended
                            </div>}
                        </div>
                    )}
                </RadioGroup>
                <div className='w-full mt-5'>
                    <Button className="w-full max-w-md" loading={loading} onClick={handlePurchase}>Purchase Plan</Button>
                </div>
            </div>
        </div>
        </>
    )
}