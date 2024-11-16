/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { useCustomAuth } from '@/store/useCustomAuthHook';
import { Button } from '@/components/ui/button';
import Plans from './home/components/plans';

export default function Home() {

    const user = useCustomAuth('/')

    return (
      <>
      {/* main */}
      <div className='w-full h-screen relative overflow-hidden'>
        <div className='absolute -z-10 w-full h-full rotate-[-8deg] -translate-y-[25%] scale-x-150 bg-gradient-to-b from-[#93F2FF] to-[#00488A]/70'> </div>
        <div className='flex items-center justify-center gap-x-20 mx-auto mt-[20%] md:mt-[10%] w-screen h-auto p-5'>
          <div className='max-w-[621px]'>
            <h6 className='text-3xl font-black text-[#064838]'>Learn Anywhere, Test Your Knowlegde With <span className='text-neutral-100'>mymedicos</span></h6>
            <p className='text-[#444E55] mt-6'>Unlock your medical career with mymedicos, the top platform for NEET PG, FMGE, and NEET SS prep. Access unparalleled MCQ practice, high-yield grand tests, and comprehensive resources. Excel in your exams and achieve your professional dreams with mymedicos.</p>
            <div className='w-full mt-6 flex justify-center'>
              <Button className=" bg-[#3C4852] hover:bg-[#3C4852]/50 min-w-[150px] mx-auto">Get Started</Button>
            </div>
          </div>
          <img src='/images/trophy.svg' className='w-[400px] h-auto hidden  md:block' alt='graphic'/>
        </div>
      </div>
{/* what choose my medicos */}
      <div className='w-full -mt-[100px]'>
        <h1 className='text-2xl font-bold text-center'>Why Choose <span className='text-[#35AA86]'>mymedicos ?</span></h1>
        <div className='flex flex-col md:flex-row gap-y-20 items-center justify-center gap-x-20 mx-auto mt-[5%] h-auto p-5'>
          <div className='max-w-[621px]'>
            <h6 className='text-3xl font-black text-[#3C4852]'>
              <span className='block'>
                More than <span className='text-[#509FD0]'>2,31,722+</span>
              </span>
              <span>
                Aspirants <span className='text-[#509FD0]'>Trusted</span> mymedicos
              </span>
            </h6>
            <p className='text-[#444E55] mt-10'>Unlock your potential with the first AI-integrated app designed to help you succeed in NEET PG, FMGE, and NEET SS. Start your journey towards a successful medical career with mymedicos.</p>
          </div>
          <img src='/images/landing-graphic-1.svg' className='w-[400px] h-auto' alt='graphic'/>
        </div>
      </div>
{/* aspirants trained */}
      <div className='w-full h-screen flex items-center'>
        <div className='flex flex-col md:flex-row-reverse gap-y-20 items-center justify-center gap-x-20 mx-auto h-auto p-5'>
          <div className='max-w-[621px]'>
            <h6 className='text-3xl font-black text-[#3C4852]'>
              <span className='block'>
                More than <span className='text-[#509FD0]'>1,27,926</span>
              </span>
              <span>
                Aspirants <span className='text-[#509FD0]'>Trained</span> mymedicos
              </span>
            </h6>
            <p className='text-[#444E55] mt-10'>Unlock your potential with the first AI-integrated app designed to help you succeed in NEET PG, FMGE, and NEET SS. Start your journey towards a successful medical career with mymedicos.</p>
          </div>
          <img src='/images/landing-graphic-2.svg' className='w-[400px] h-auto' alt='graphic'/>
        </div>
      </div>
{/* ai platform */}
      <div className='w-full min-h-[80vh]'>
        <h1 className='text-2xl font-bold text-center'>AI integrated Learning platform <span className=' rounded-md border-2 border-black px-3 py-2'>Ai</span></h1>
        <div className='flex flex-col md:flex-row gap-y-20 items-center justify-center gap-x-20 mx-auto mt-[5%] h-auto p-5'>
          <div className='max-w-[621px]'>
            <h6 className='text-3xl font-black text-[#3C4852]'>
            Join mymedicos Today!
            </h6>
            <p className='text-[#444E55] mt-10'>Unlock your potential with the first AI-integrated app designed to help you succeed in NEET PG, FMGE, and NEET SS. Start your journey towards a successful medical career with mymedicos.</p>
          </div>
          <img src='/images/landing-graphic-3.svg' className='w-[400px] h-auto' alt='graphic'/>
        </div>
      </div>
      <div>
        <Plans/>
      </div>
{/* download links */}
      <div className='w-full min-h-[90vh] flex items-center'>
        <div className='flex flex-col md:flex-row gap-y-20 items-center justify-center gap-x-20 mx-auto h-auto p-5'>
          <div className='max-w-[621px]'>
          <h6 className='text-3xl font-black text-[#064838]'>
              Access High-yielding MCQ&apos;s, 
              <div className='relative inline whitespace-nowrap'>
                Grand test,
                <div className='absolute -right-3 -top-1/2'>
                  <img src='/images/flare.svg' className='h-full' alt='graphic'/>
                </div>
              </div> 
              <br/>
              Test series, Ebooks and more 
            </h6>
            <p className='text-[#444E55] mt-6'>mymedicos: Connecting medical professionals with advanced knowledge and collaboration on any device—iOS, Android, or Laptop.</p>
            <div className='w-full mt-6 flex justify-start gap-x-4'>
              <div className="flex mt-3 w-full max-w-48 h-14 px-3 bg-black text-white rounded-lg items-center justify-center">
                  <div className="mr-3">
                      <svg viewBox="30 336.7 120.9 129.2" width="30">
                          <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"/>
                          <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"/>
                          <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"/>
                          <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"/>
                      </svg>
                  </div>
                  <div>
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
                  </div>
              </div>
              <div className="flex mt-3 w-full max-w-48 h-14 px-3 bg-black text-white rounded-xl items-center justify-center">
                  <div className="mr-3">
                      <svg viewBox="0 0 384 512" width="30" >
                          <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                      </svg>
                  </div>
                  <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-2xl font-semibold font-sans -mt-1">App Store</div>
                  </div>
              </div>
            </div>
          </div>
          <img src='/images/landing-graphic-4.svg' className='w-[400px] h-auto' alt='graphic'/>
        </div>
      </div>
{/* testimonial */}
      <div className='w-full min-h-[50vh] flex flex-col'>
        <h1 className='text-2xl font-bold text-center px-4'>What they say about <span className='text-[#35AA86] whitespace-nowrap'>mymedicos ?</span></h1>
        <div className='w-full flex items-center gap-x-5 h-auto overflow-x-hidden  mt-[5%] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite'>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
          </div>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite'>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
          </div>
        </div>
        <div className='w-full flex items-center gap-x-5 h-auto overflow-x-hidden  mt-5 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite-reverse'>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
          </div>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite-reverse'>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
              <TestimonialCard/>
          </div>
        </div>
      </div>
{/* footer */}
      <div className='min-h-[40vh] w-full bg-neutral-50 border-t border-neutral-100 mt-[10%]'>

      </div>

      
      </>
    );
}

function TestimonialCard(){
  return (
    <figure className="relative rounded-2xl bg-white p-6 border border-neutral-200 shadow-sm min-w-[100px]">
        <svg aria-hidden="true" width="105" height="78" className="absolute top-6 left-6 fill-slate-100">
            <path
                d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
            </path>
        </svg>
        <blockquote className="relative">
            <p className="text-lg tracking-tight text-slate-900">
                Awesome idea. Can&apos;t wait to see how this turns out!
            </p>
        </blockquote>
        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
                <div className="font-display text-base text-slate-900">Exmaple name</div>
                <div className="mt-1 text-sm text-slate-500">Job designation</div>
            </div>
            <div className="overflow-hidden rounded-full bg-slate-50">
                <img alt="" src="https://i.pravatar.cc/300" className="h-14 w-14 object-cover" loading="lazy" width="56" height="56"/>
            </div>
        </figcaption>
    </figure>
  )
}

