"use client"
import React from 'react'
import Link from 'next/link'

const YourGoals = () => {
    return (
        <div className='w-full py-[8%] h-auto px-6'>
            <div className='w-full text-center text-3xl font-semibold text-[#03755A]'>WHATS YOUR GOAL?</div>
            <div className='flex  justify-center gap-x-10 gap-y-10 items-center mt-[5%] max-md:flex-col'>
                <div className='max-w-sm w-full border p-5 rounded-xl py-8 flex flex-col items-center shadow-lg shrink'>
                    <div className='text-xl font-bold w-full text-center text-[#03755A]'>NEET PG</div>
                    <div className='w-full text-center mt-5 max-w-[300px] mx-auto '>
                        Transform Your Preparations with a Flexible, Personalized, and Ready-to-Learn Curriculum. Our program is dedicated to the latest exam patterns, focusing on clinical, practice-based models. Enjoy selective learning, rigorous revisions, and repeated practice for optimal results.
                    </div>
                    <div className='mt-10'></div>
                    <Link href="/pgneet" className="bg-primary text-primary-foreground p-2.5 font-medium px-6 rounded-xl cursor-pointer"> Explore More </Link>
                </div>               

                <div className='max-w-sm w-full border p-5 rounded-xl py-8 flex flex-col items-center shadow-lg'>
                    <div className='text-xl font-bold w-full text-center text-[#03755A]'>FMGE</div>
                    <div className='w-full text-center mt-5 max-w-[300px] mx-auto'>
                        Transform Your Preparations with a Flexible, Personalized, and Ready-to-Learn Curriculum. Our program is dedicated to the latest exam patterns, focusing on clinical, practice-based models. Enjoy selective learning, rigorous revisions, and repeated practice for optimal results.
                    </div>
                    <div className='mt-10'></div>
                    <Link href="/pgneet" className="bg-primary text-primary-foreground p-2.5 font-medium px-6 rounded-xl cursor-pointer"> Explore More </Link>
                </div>

                <div className='max-w-sm w-full border p-5 rounded-xl py-8 flex flex-col items-center shadow-lg'>
                    <div className='text-xl font-bold w-full text-center text-[#03755A]'>NEET SS</div>
                    <div className='w-full text-center mt-5 max-w-[300px] mx-auto'>
                        Transform Your Preparations with a Flexible, Personalized, and Ready-to-Learn Curriculum. Our program is dedicated to the latest exam patterns, focusing on clinical, practice-based models. Enjoy selective learning, rigorous revisions, and repeated practice for optimal results.
                    </div>
                    <div className='mt-10'></div>
                    <Link href="/pgneet" className="bg-primary text-primary-foreground p-2.5 font-medium px-6 rounded-xl cursor-pointer"> Explore More </Link>
                </div>
            </div>
        </div>
    )
}

export default YourGoals