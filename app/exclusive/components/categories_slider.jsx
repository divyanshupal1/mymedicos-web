"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const CategoriesSlider =  ({exams}) => {  
    exams = JSON.parse(exams)  
    const selected = useSearchParams().get('exam')
    return (
        <div className="flex gap-x-5">
            {
                exams?.map((exam,index)=>
                    <Link href={`/exclusive/courses?exam=${exam}`} key={index} className={`shrink-0 p-1 px-4 border ${exam==selected ?"bg-green-400 font-medium text-white":"bg-green-50"} rounded-md`}>{exam}</Link>
                )
            }
        </div>
    )
}

export default CategoriesSlider