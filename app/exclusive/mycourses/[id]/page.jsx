
import React from 'react'
import { decodeToken } from '@/lib/getDecodedToken.js'
import { IoAdd } from 'react-icons/io5'
// import { Button } from '@/components/ui/button'

import {OverviewSkeleton} from "../../components/course-overview-skeleton";
import dynamic from "next/dynamic";


const CourseOverview = dynamic(() => import("../components/course-overview"),{
    loading: () => <OverviewSkeleton/>
});




const CoursePage = async ({params}) => {

  const {token,error} = decodeToken()
  if(error || !token) return <div>{error}</div>



  return (
    <div className='w-full '>
      <CourseOverview params={params}/>
    </div>
  )
}

export default CoursePage