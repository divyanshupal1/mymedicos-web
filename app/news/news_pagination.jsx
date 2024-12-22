"use client"
import { Button } from '@/components/ui/button'
import { ChevronFirst, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewsPagination = ({totalPages,currentPage}) => {
    const router = useRouter()
    currentPage = parseInt(currentPage)
    const handlPageChange = (page) => {
        if(page==currentPage) return
        router.push('/news?page='+page)
    }


    let pages = []
    if(currentPage>1) pages.push(currentPage-1)
    if(currentPage==totalPages) pages.push(totalPages-2)
    pages.push(currentPage)
    if(currentPage<totalPages)  pages.push(currentPage+1)
    if(currentPage==1) pages.push(3)


  return (
    <div className='w-full'>
        <div className='flex justify-center items-center gap-2 mt-5'>
            <Button className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md' onClick={()=>handlPageChange(1)} disabled={currentPage===1}><ChevronFirst/></Button>
            <Button className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md' onClick={()=>currentPage>1 && handlPageChange(currentPage-1)} disabled={currentPage===1}><ChevronLeft/></Button>
            <div className='flex gap-2'>
            {
                pages.map((i) => (
                <Button key={i} className={`px-3 py-1 rounded-md ${currentPage===i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={()=>handlPageChange(i)} >{i}</Button>
                ))
            }
            </div>
            <Button className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md' onClick={()=>currentPage<totalPages && handlPageChange(currentPage+1)} disabled={currentPage===totalPages}><ChevronRight/></Button>
            <Button className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md' onClick={()=>handlPageChange(totalPages)} disabled={currentPage===totalPages}><ChevronFirst transform='rotate(180)'/></Button>
        </div>
    </div>
  )
}

export default NewsPagination