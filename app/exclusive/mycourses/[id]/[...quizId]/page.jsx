"use client"
import { Button, buttonVariants } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getSubmissions } from '@/actions'




const QuizDetails = ({params}) => {
  const {id,quizId} = params
  const [submissions,setSubmissions] = React.useState({})
  const [loading,setLoading] = React.useState(true)
  const [progress,setProgress] = React.useState(null)

  React.useEffect(()=>{
    const loadData = async()=>{
      const {data,error} = await getSubmissions(id,quizId[1],quizId[0])
      if(error) alert("Something went wrong")

      setSubmissions(data?.submissions || {})
      setProgress(data?.progress || {})
      setLoading(false)
    }
    loadData()
  },[id, quizId])

  const stats = useMemo(()=>{{
    let total = 0
    let highest = 0
    let lowest = 0
    let average = 0
    let count = 0
    let sum = 0
    Object.keys(submissions).map((key)=>{
      total += submissions[key].marks
      count++
      sum += submissions[key].marks
      if(submissions[key].marks > highest) highest = submissions[key].marks
      if(submissions[key].marks < lowest) lowest = submissions[key].marks
    })
    average = sum / count
    return {total,highest,lowest,average}
  }},[submissions])
  
  return (
    <div className='w-full p-2 mt-4'>
        <div className='w-full flex justify-between items-start gap-4'>
            <div>
              <h1 className=' text-xl font-semibold'>{quizId[2]}</h1>
              <h6 className='text-sm text-neutral-800'>{quizId[0]}</h6>
            </div>
            <div>
              {
                progress==null?
                <Button variant='default' loading className="w-[100px]"></Button>
                :
                <Link href={`/test/exclusive?course=${id.split("-").pop()}&quiz=${quizId[1]}&type=${quizId[0]}&name=${quizId[2]}`} className={cn(buttonVariants({variant:"default"}))}>{Object.keys(progress).length==0?"Start Quiz":"Continue Quiz"}</Link>
              }
            </div>
        </div>

        {
          loading ? <div className='w-full h-64 flex justify-center items-center'><div className='loader'></div></div> :
          <div className='grid grid-cols-1 gap-4 mt-4'>
            {/* {
              submissions.map((submission,i)=>(
                <div key={i} className='bg-white p-4 rounded-lg shadow-sm'>
                  <h3 className='text-lg font-semibold'>{submission?.name}</h3>
                  <h6 className='text-sm text-neutral-800'>{submission.marks}</h6>
                </div>
              ))
            } */}
          </div>
        }

        <div className='grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold'>Submissions</h3>
                <h6 className='text-sm text-neutral-800'>{Object.keys(submissions).length}</h6>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold'>Average Score</h3>
                <h6 className='text-sm text-neutral-800'>{stats.average}</h6>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold'>Highest Score</h3>
                <h6 className='text-sm text-neutral-800'>{stats.highest}</h6>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold'>Lowest Score</h3>
                <h6 className='text-sm text-neutral-800'>{stats.lowest}</h6>
            </div>
        </div>
        <h2 className='text-lg font-medium mt-6'>All Submissions</h2>
        <div>
          {
            Object.keys(submissions).map((key,i)=>(
              <div key={i} className='bg-white p-4 flex items-center justify-between  mt-2 border-b border-neutral-300'>
                <div>
                  <h3 className='text-lg font-semibold'>{new Date(key).toLocaleDateString()}-{new Date(key).toLocaleTimeString()}</h3>
                  <h6 className='text-sm text-neutral-800'>Marks: {submissions[key].marks}</h6>
                </div>
                <div>
                  <Link href={`/test/exclusive/result?course=${id.split("-").pop()}&quiz=${quizId[1]}&type=${quizId[0]}&name=${quizId[2]}&subid=${key}`} className='text-primary'>View Result</Link>
                  </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default QuizDetails

