import React from 'react'
import CommunityHeader from './components/community_header'
import {QuestionsFeed} from './components/questions_feed'
import CommunitySidebar from './components/community_sidebar'

const CommunityPage = () => {
  return (
    <>
      <CommunityHeader/>
      <QuestionsFeed/>
    </>

  )
}

export default CommunityPage