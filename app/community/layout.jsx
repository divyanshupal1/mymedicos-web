import React from 'react'
import CommunityHeader from './components/community_header'
import {QuestionsFeed} from './components/questions_feed'
import CommunitySidebar from './components/community_sidebar'

const CommunityLayout = ({children}) => {
  return (
    <div className='relative w-full h-auto max-w-[1300px] mx-auto flex justify-center gap-4 '>
      <div className='h-fit md:h-full w-full fixed bottom-0 left-0 max-md:z-50 md:w-1/5 md:max-w-md md:min-h-screen md:block md:sticky md:top-0'>
         <CommunitySidebar/>
      </div>
      <div className='w-full md:w-3/5 max-w-2xl h-full min-h-screen pt-3 px-2  border-gray-200'>
          {
            children
          }
      </div>
      <div className='w-full md:w-1/5 max-w-md min-h-screen hidden md:block sticky top-0'>
          {/* <h1>Treading Tags</h1> */}
      </div>
    </div>
  )
}

export default CommunityLayout