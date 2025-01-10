import admin from '@/lib/firebase_admin'
import React from 'react'
import { NewsCard } from './news_card'
import NewsPagination from './news_pagination'

const NEWS = async ({searchParams}) => {
  const search = await searchParams
  const page = search.page || 1

  const newsDocs = await admin.firestore()
                              .collection('MedicalNews')
                              .orderBy('Time','desc')
                              .limit(15)
                              .offset((page-1)*15)
                              .get()

  const news = newsDocs.docs.map(doc => ({...doc.data(),id:doc.id}))

  const totalNews = await admin.firestore().collection('MedicalNews').count().get()
  const totalPages = Math.ceil(totalNews.data().count/15)


  return (
    <div className='w-full p-2'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
          {
            news.map((item, id) => (
              <NewsCard key={id} item={JSON.stringify(item)} />
            ))
          }
      </div>
      <NewsPagination totalPages={totalPages} currentPage={page}/>

    </div>
  )
}

export default NEWS


