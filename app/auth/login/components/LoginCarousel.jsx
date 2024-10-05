"use client"

import React, { useEffect } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { MdNavigateNext } from "react-icons/md";
import Autoplay from 'embla-carousel-autoplay'



const LoginCarousel = () => {

    const [api, setApi] = React.useState()
    const [index, setIndex] = React.useState(0)

    const scrollTo = (index) => {
        if(!api) return
        api.scrollTo(index)
    }

    const setApiChange = (api) => {
        setApi(api)
        api?.on('slidesInView', () => {
            setIndex(api.slidesInView()[0])
        })
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-8">
        <Carousel className="w-[50%] aspect-square relative group rounded-md " setApi={setApiChange} opts={{loop:true}} plugins={[Autoplay({delay:3000})]} >
            <CarouselContent>         
                <CarouselItem className="w-full h-full rounded-md">
                    <img src="/images/login-caraousel-1.svg" className="h-full w-auto"/>
                </CarouselItem>         
                <CarouselItem className=" w-full h-full rounded-md overflow-hidden">
                    <img src="/images/login-caraousel-2.svg" className=" h-full w-auto  object-cover"/>
                </CarouselItem>         
                <CarouselItem className=" w-full h-full rounded-md overflow-hidden">
                    <img src="/images/login-caraousel-3.svg" className=" h-full w-auto object-cover"/>
                </CarouselItem>         
            </CarouselContent>

        </Carousel>
        <div className="flex gap-x-2">
            <div className={`w-2 h-2 rounded-full ${index==0?'bg-primary':'bg-white'}`} onClick={()=>scrollTo(0)}></div>
            <div className={`w-2 h-2 rounded-full ${index==1?'bg-primary':'bg-white'}`} onClick={()=>scrollTo(1)}></div>
            <div className={`w-2 h-2 rounded-full ${index==2?'bg-primary':'bg-white'}`} onClick={()=>scrollTo(2)}></div>
        </div>

        </div>
    )
}

export default LoginCarousel