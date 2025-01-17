import React from 'react'
import CommunityHeader from './components/community_header'
import {QuestionsFeed} from './components/questions_feed'

const CommunityPage = () => {
  return (
    <div className='w-full max-w-2xl mx-auto h-full min-h-screen pt-3 px-2'>
        <CommunityHeader/>
        <QuestionsFeed/>
    </div>
  )
}

export default CommunityPage