"use client"
import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import { useCustomAuth } from "@/store/useCustomAuthHook"


const items = [
  {
    title:["Excel in your ","NEET PG"," Exam Preparation"],
    description:"We simplify, enhance, and make your NEET PG preparation enjoyable and engaging with our all-inclusive 3600 learning solution.",
    points:["Expert-reviewed Qbank","Comprehensive grand tests","Focused topic tests","Rapid Revision Program (RRP)"],
    card:{
      title:"PG NEET",
      points:["3 test series ","1 Grandtest ","Unlimited Practice MCQS","3 test series ","Unlimited Practice MCQS"],
      price:8000,
    },
    action :"/pgneet",
    for:"pgneet"
  },
  {
    title:["Your Ultimate Partner for ","FMGE"," Success"],
    description:"We simplify, enhance, and make your NEET PG preparation enjoyable and engaging with our all-inclusive 3600 learning solution.",
    points:["Expert-reviewed Qbank","Comprehensive grand tests","Focused topic tests","Rapid Revision Program (RRP)"],
    card:{
      title:"FMGE",
      points:["3 test series ","1 Grandtest ","Unlimited Practice MCQS","3 test series ","Unlimited Practice MCQS"],
      price:8000,
    },
    action :"/fmge",
    for:"fmge"
  },
  // {
  //   title:["Streamline Your ","NEET SS"," Prep for Outstanding Results"],
  //   description:"We simplify, enhance, and make your NEET PG preparation enjoyable and engaging with our all-inclusive 3600 learning solution.",
  //   points:["Expert-reviewed Qbank","Comprehensive grand tests","Focused topic tests","Rapid Revision Program (RRP)"],
  //   card:{
  //     title:"NEET SS",
  //     points:["3 test series ","1 Grandtest ","Unlimited Practice MCQS","3 test series ","Unlimited Practice MCQS"],
  //     price:8000,
  //   },
  //   action :"/neetss",
  //   for:"neetss"
  // },
]

export function ExclusiveCarousel() {
  const [api, setApi] = React.useState()
  const [index, setIndex] = React.useState(0)

  const user = useCustomAuth('/exclusive')

  console.log(user)


  // const setApiChange = (api) => {
  //     setApi(api)
  //     api?.on('slidesInView', () => {
  //         setIndex(api.slidesInView()[0])
  //     })
  // }


  // React.useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  // }, [api])

  return (
    <Carousel 
    // setApi={setApiChange}  
    opts={{loop:true}} plugins={[Autoplay({delay:5000})]} className="w-full h-auto p-4">
      <CarouselContent>
          {
            items.map((item, index) => <CarouselItem key={index}> <NeetPgItem item={item}/> </CarouselItem> )
          }
      </CarouselContent>

    </Carousel>
  )
}

import { FaListCheck } from "react-icons/fa6";
import { TbPoint } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link"
const NeetPgItem = ({item}) => {
    return (
        <div className="w-full h-full flex gap-x-3 justify-between px-10 items-center aspect-[10/4] bg-blue-50 max-xl:aspect-[10/5] max-lg:aspect-[11/7] max-md:aspect-[11/8] max-sm:aspect-[11/16] rounded-md">

            <div className="w-1/2 max-md:w-full h-full flex flex-col justify-center items-center">
              <div className="max-w-lg h-auto rounded-xl">
                  <div>
                    <div className="text-4xl font-bold text-[#5f9c8e]">{item.title[0]}<span className="text-[#0b7a62]">{item.title[1]}</span>{item.title[2]}</div>
                  </div>
                  <div>
                    <div className="text-base text-left mt-4">{item.description}</div>
                  </div>
                  <div className="flex flex-col gap-y-4 mt-4">
                      {
                        item.points.map((point, index) => <div key={index} className="flex gap-x-2 items-center font-medium"><TbPoint className="scale-125 text-[#21B2BB]"/>{point}</div>)
                      }
                  </div>
                  <div className="flex gap-x-4 mt-8">
                    <Link href={item.action} className="bg-primary text-primary-foreground p-2.5 font-medium px-6 rounded-xl cursor-pointer">Get Started</Link>
                  </div>
              </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center max-md:hidden ">
                  <div className="card w-full max-w-sm bg-white h-auto p-5 rounded-xl shadow-lg border">
                    <div className="w-full h-16 bg-gradient-to-b from-[#2BD0BF] to-[#03755A] rounded-lg"></div>
                    <div className="text-2xl font-bold text-[#03755A] text-center mt-6">{item.card.title}</div>
                    <div className="mt-6 flex flex-col gap-y-4 pl-2">
                        {
                          item.card.points.map((point, index) => <div key={index} className="flex gap-x-2 items-center"><FaListCheck className="scale-90 text-[#21B2BB]"/>{point}</div>)
                        }
                    </div>
                    <div className="text-2xl font-bold text-[#03755A] text-center mt-8 mb-6">₹ {item.card.price}/-</div>
                  </div>
            </div>

        </div>
    )
}