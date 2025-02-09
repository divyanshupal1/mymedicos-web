/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { useCustomAuth } from '@/store/useCustomAuthHook';
// import { Button } from '@/components/ui/button';
import Plans from './home/components/plans';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import Bento from './home/components/bento';
import CommunityTabs from './home/components/community_tabs';
import LearnSmart from './home/components/learn_smart';
import Precesion from './home/components/precesion';
import Footer from './home/components/footer';

export default function Home() {

  const user = useCustomAuth('/')

  return (
    <>
      {/* main */}
      <section className="bg-white dark:bg-gray-900">
        <div className="pt-8 px-4 mx-auto max-w-[1800px] text-center lg:pt-16 lg:px-12">

          <div className='w-full flex items-center justify-center mt-8'>
            <Typewriter
              options={{
                strings: [`Seamless <span style="color:#00DDB3" className='text-[#00DDB3]'>Connections</span>`, `Limitless <span style="color:#00DDB3">Knowledge</span>`],
                autoStart: true,
                loop: true,
                cursor:'',
                wrapperClassName: 'mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl',
              }}
            />  
          </div>
          <p className="mb-8 mt-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 max-w-screen-xl mx-auto">Your Premier Destination for Medical Professionals, Offering an Extensive Network, Advanced Educational Resources, and Continuous Learning Opportunities to Empower and Enhance Professional Growth and Expertise</p>
          <div className=" mb-8 space-x-4 flex items-center justify-center  max-w-screen-xl mx-auto">
            <div className="flex w-full max-w-48 h-14 px-3 max-sm:scale-75 sm:scale-90 md:scale-100 bg-black text-white rounded-lg items-center justify-center">
              <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                  <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
                  <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z" />
                  <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
                  <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
                </svg>
              </div>
              <div className='text-left whitespace-nowrap'>
                <div className="text-xs">GET IT ON</div>
                <div className="text-xl font-semibold font-sans -mt-1">Google Play</div>
              </div>
            </div>
            <div className="flex w-full max-w-48 h-14 px-3 max-sm:scale-75 sm:scale-90 md:scale-100 bg-black text-white rounded-xl items-center justify-center">
              <div className="mr-3">
                <svg viewBox="0 0 384 512" width="30" >
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </div>
              <div className='text-left whitespace-nowrap'>
                <div className="text-xs">Download on the</div>
                <div className="text-2xl font-semibold font-sans -mt-1">App Store</div>
              </div>
            </div>
          </div>
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-[1800px] lg:px-36">
              <Image src="/images/mockup.png" width={1200} height={1200} alt="mockup" className='mx-auto' />
          </div>
        </div>
      </section>
      {/* bento */}
        <div className='w-full  bg-[#00DDB3]/10 drop-shadow-md'>
          <Bento/>
        </div>
      {/* community connecting medicos globally */}
      <div className='px-2'>
        <CommunityTabs/>
      </div>
      {/* learn Smart */}
      <div className='px-2 mt-10'>
        <LearnSmart/>
      </div>
      <div className='px-2 mt-10'>
        <Precesion/>
      </div>

      {/* testimonial */}
      <div className='w-full min-h-[50vh] flex flex-col pt-10'>
        <h1 className='text-2xl font-bold text-center px-4'>What they say about <span className='text-[#35AA86] whitespace-nowrap'>mymedicos ?</span></h1>
        <div className='w-full flex items-center gap-x-5 h-auto overflow-x-hidden  mt-[5%] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite'>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite'>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </div>
        <div className='w-full flex items-center gap-x-5 h-auto overflow-x-hidden  mt-5 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite-reverse'>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
          <div className='flex gap-x-5 flex-shrink-0 animate-marquee-infinite-reverse'>
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </div>
      </div>
      {/* footer */}
      <div className='w-full bg-neutral-50 border-t border-neutral-100 mt-[10%]'>
              <Footer/>
      </div>


    </>
  );
}

function TestimonialCard() {
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
          <img alt="" src="https://i.pravatar.cc/300" className="h-14 w-14 object-cover" loading="lazy" width="56" height="56" />
        </div>
      </figcaption>
    </figure>
  )
}

