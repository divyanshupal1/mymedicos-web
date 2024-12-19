import React from 'react'
import { decodeToken } from '@/lib/getDecodedToken'
import admin from '@/lib/firebase_admin'
import { IoAdd } from 'react-icons/io5'
import SWGTQuizCard from '../../components/swgt-quiz-card'
import Link from 'next/link'
import { ContentAccordion } from './content-accordion'


const getSwgtQuizes = async (docId) => {
    const SWGT = await admin.firestore().collection('Exclusive_Course').doc(docId).collection('SWGT').get()
    const CWT = await admin.firestore().collection('Exclusive_Course').doc(docId).collection('CWT').get()
    const NOTES = await admin.firestore().collection('Exclusive_Course').doc(docId).collection('Notes').get()

    return new Promise((resolve)=>{
        const result = {
            SWGT: SWGT.docs.map(doc => ({
                title:doc.data().title,
                Data:doc.data()?.Data?.length ,
                qid:doc.data()?.docId  
            })),
            CWT : CWT.docs.map(doc => ({
                    title:doc.data().title,
                    index:doc.data()?.index,
                    Data:doc.data()?.Data?.length ,
                    qid:doc.data()?.docId
            })),
            NOTES : NOTES.docs.map(doc => ({
                title:doc.data().title,
                Data:doc.data()?.Data?.length ,
                id:doc.data()?.docId
            }))
        }
        resolve(result)
    }
)
}

const SWGTQuizes = async ({ params }) => {
    const {token,error} = decodeToken()
    if(error || !token) return <div>{error}</div>

    const quizes = await getSwgtQuizes(params.id)
    // quizes.forEach(quiz => console.log(quiz?.title))

    return (
        <div>
            <h1 className='text-base font-semibold mb-4'>Course Content</h1>
            <ContentAccordion title={`Subject Wise Tests (${quizes.SWGT.length})`} >
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
                    {
                        quizes.SWGT.map((quiz,index)=>
                            <SWGTQuizCard key={index} courseId={params.id} quizId={quiz.qid} title={quiz?.title} questions={quiz?.Data} type='SWGT'/>
                        )
                    }
                </div>
            </ContentAccordion>
            <ContentAccordion title={`Chapter Wise Tests (${quizes.CWT.length})`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
                    {
                        quizes.CWT.map((quiz,index)=>
                            <SWGTQuizCard key={index} courseId={params.id} quizId={quiz.qid} title={quiz?.title} questions={quiz?.Data} type='CWT'/>
                        )
                    }
                </div>
            </ContentAccordion>            
            <ContentAccordion title={`Notes (${quizes.NOTES.length})`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
                    {
                        quizes.NOTES.map((quiz,index)=>
                            <SWGTQuizCard key={index} courseId={params.id} quizId={quiz.qid} title={quiz?.title} questions={quiz?.Data} type='NOTES'/>
                        )
                    }
                </div>
            </ContentAccordion>            
        </div>
    )
}

export default SWGTQuizes


