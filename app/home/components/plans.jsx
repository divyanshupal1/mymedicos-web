import React from 'react'

const plans = {
    "MBBS": [
        {
            name: 'Basic',
            price: 199,
            features: [
                'Access to Question Bank (limited questions per month, e.g., 500 questions)',
                'Basic eBook access (limited to a few essential books or chapters)',
                'Limited AI Mentor access (e.g., 10 queries per month)',
                'Unlimited access to all courses',
            ]
        },
        {
            name: 'Advanced',
            price: 899,
            features: [
                'Access to Question Bank (unlimited or increased limit, e.g., 2000 questions per month)',
                'Full eBook access (access to all books or chapters)',
                'Enhanced AI Mentor access (e.g., 30 queries per month)',
                'Additional features such as study progress tracking, regular updates, and exclusive content',
            ]
        },
        {
            name: 'Pro',
            price: 999,
            features: [
                'Unlimited access to Question Bank',
                'Full eBook access',
                'Unlimited AI Mentor access',
                'Premium features like personalized study plans, mock exams, priority support, and early access to new features',
            ]
        }
    ],
    "FMGE": [
        {
            name: 'Basic',
            price: 299,
            features: [
                'Access to Question Bank (limited questions per month, e.g., 500 questions)',
                'Basic eBook access (limited to a few essential books or chapters)',
                'Limited AI Mentor access (e.g., 10 queries per month)',
                'Unlimited access to all courses',
            ]
        },
        {
            name: 'Advanced',
            price: 899,
            features: [
                'Access to Question Bank (unlimited or increased limit, e.g., 2000 questions per month)',
                'Full eBook access (access to all books or chapters)',
                'Enhanced AI Mentor access (e.g., 30 queries per month)',
                'Additional features such as study progress tracking, regular updates, and exclusive content',
            ]
        },
        {
            name: 'Pro',
            price: 999,
            features: [
                'Unlimited access to Question Bank',
                'Full eBook access',
                'Unlimited AI Mentor access',
                'Premium features like personalized study plans, mock exams, priority support, and early access to new features',
            ]
        }
    ],
    "NEET PG": [
        {
            name: 'Basic',
            price: 99,
            features: [
                'Access to Question Bank (limited questions per month, e.g., 500 questions)',
                'Basic eBook access (limited to a few essential books or chapters)',
                'Limited AI Mentor access (e.g., 10 queries per month)',
                'Unlimited access to all courses',
            ]
        },
        {
            name: 'Advanced',
            price: 899,
            features: [
                'Access to Question Bank (unlimited or increased limit, e.g., 2000 questions per month)',
                'Full eBook access (access to all books or chapters)',
                'Enhanced AI Mentor access (e.g., 30 queries per month)',
                'Additional features such as study progress tracking, regular updates, and exclusive content',
            ]
        },
        {
            name: 'Pro',
            price: 999,
            features: [
                'Unlimited access to Question Bank',
                'Full eBook access',
                'Unlimited AI Mentor access',
                'Premium features like personalized study plans, mock exams, priority support, and early access to new features',
            ]
        }
    ],
    "NEET SS": [
        {
            name: 'Basic',
            price: 399,
            features: [
                'Access to Question Bank (limited questions per month, e.g., 500 questions)',
                'Basic eBook access (limited to a few essential books or chapters)',
                'Limited AI Mentor access (e.g., 10 queries per month)',
                'Unlimited access to all courses',
            ]
        },
        {
            name: 'Advanced',
            price: 899,
            features: [
                'Access to Question Bank (unlimited or increased limit, e.g., 2000 questions per month)',
                'Full eBook access (access to all books or chapters)',
                'Enhanced AI Mentor access (e.g., 30 queries per month)',
                'Additional features such as study progress tracking, regular updates, and exclusive content',
            ]
        },
        {
            name: 'Pro',
            price: 999,
            features: [
                'Unlimited access to Question Bank',
                'Full eBook access',
                'Unlimited AI Mentor access',
                'Premium features like personalized study plans, mock exams, priority support, and early access to new features',
            ]
        }
    ]
}

const Plans = () => {

    const [group, setGroup] = React.useState(2)
    const [billed, setBilled] = React.useState(0)

return (
    <div className='w-full flex flex-col gap-y-6'>
        <div className='text-center text-3xl font-semibold text-[#03755A]'>Choose Your Plan</div>
        <div className='w-full px-5 mb-5 '>
            <div className='w-full max-w-2xl mx-auto flex gap-x-3 justify-between items-center rounded-full border *:text-[#089B88] *:font-medium *:p-2 max-md:*:p-1 max-md:*:px-2 *:px-10 *:rounded-full'>
                {
                    Object.keys(plans).map((key, index) => 
                        <div key={index} onClick={()=>setGroup(index)} className={`cursor-pointer ${group==index?"bg-secondary text-white":""}`}>{key}</div>
                    )
                }
            </div>
        </div>
        <div className='w-full px-5 mb-5 '>
            <div className='w-fit *:p-2 border flex mx-auto *:w-[110px] *:text-center'>
                <div onClick={()=>setBilled(0)} className={`cursor-pointer ${billed==0?"bg-secondary":""}`}>Monthly</div>
                <div onClick={()=>setBilled(1)} className={`cursor-pointer ${billed==1?"bg-secondary":""}`}>Yearly</div>
            </div>
        </div>
        <div className='w-full'>
            <div className='w-full max-w-7xl p-1 mx-auto flex items-center justify-center gap-x-5 max-md:flex-col gap-y-4'>
                {
                    plans[Object.keys(plans)[group]].map((plan, index) =><Plancard key={index} index={index} plan={plan} billed={billed}/>)
                }
            </div>
        </div>
        
    </div>
)
}

export default Plans

import { Button } from '@/components/ui/button'
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const Plancard = ({plan,index,billed}) => {

    return (        
        <div className={`card p-6  rounded-xl border flex flex-col gap-y-7  w-full max-w-sm ${index==1?"text-white bg-gradient-to-br from-[#6ECFC2] to-[#1E5746]":"bg-white text-[#03755A]"}`}>
            <div className={`p-2 px-5 rounded-md border-2 font-medium w-fit mx-auto ${index==1?"border-white":"border-border"}`}>{plan.name}</div>
            <div className='text-2xl flex flex-col font-bold text-center mx-auto'>{billed==0?<div>₹ {plan.price}</div>:<><div>₹ {(plan.price-20)*12}</div><div className='text-sm line-through'>₹ {plan.price*12}</div></>}</div>
            <div className='features flex flex-col gap-y-3  max-w-xs mx-auto'>
                {
                    plan.features.map((feature, index) => <div key={index} className='text-sm flex gap-x-3 items-start'><span className='scale-125 pt-1'><MdOutlineCheckCircleOutline/></span><span>{feature}</span></div>)
                }
            </div>    
            <div className='w-full flex items-center justify-center'>
                <Button className="mx-auto h-[45px] w-full max-w-[150px]" >Choose Plan</Button>
            </div>
        </div>
    )
}