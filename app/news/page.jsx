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
      <h1 className='text-xl font-semibold'>News</h1>
      <div className='flex flex-col gap-y-4'>
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


