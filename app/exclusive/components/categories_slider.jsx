"use client"
import React, { useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const CategoriesSlider =  ({exams}) => {  
    exams = JSON.parse(exams)  
    let selected = useSearchParams().get('e')
    selected = selected ? selected.replaceAll("-"," ") : null

    const container = React.useRef(null)
    const [scroll, setScroll] = React.useState(0)
    const [showRight, setShowRight] = React.useState(true)

    const moveRight = () => setScroll(scroll+200)
    const moveLeft = () => setScroll(scroll-200)
    
    useEffect(() => {
        container.current.scrollLeft = scroll
        if(container.current.scrollWidth-container.current.clientWidth-scroll>0){
            setShowRight(true)
        }else{
            setShowRight(false)
        }
    }, [scroll])

    return (
         <div className='w-auto  relative  ' >
            <div className="flex gap-x-5 w-auto overflow-x-auto ml-4 scroll-hide scroll-smooth pr-[50px]" ref={container}>
                {
                    exams?.map((exam,index)=>
                        <Link href={`/exclusive/courses?e=${exam.replaceAll(" ","-")}`} key={index} className={`shrink-0 p-4 px-4 border ${exam==selected ?"bg-primary font-medium text-white":"bg-green-50"} rounded-md`}>{exam}</Link>
                    )
                }
            </div>
            {
                scroll>0 &&
                <div onClick={moveLeft} className="absolute h-full top-0 left-0 bg-gradient-to-l from-transparent to-white w-[50px] flex items-center justify-center cursor-pointer">
                    <ChevronLeft className="w-10 h-10 text-neutral-600"/>
                </div>
            }
            {
                showRight &&
                <div onClick={moveRight} className="absolute h-full top-0 right-0 bg-gradient-to-r from-transparent to-white w-[50px] flex items-center justify-center cursor-pointer">
                    <ChevronRight className="w-10 h-10 text-neutral-600"/>
                </div>
            }
        </div>
    )
}

export default CategoriesSlider