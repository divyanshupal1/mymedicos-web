import React from 'react'
import { decodeToken } from '@/lib/getDecodedToken'
import admin from '@/lib/firebase_admin'
import { IoAdd } from 'react-icons/io5'
import SWGTQuizCard from '../../components/swgt-quiz-card'
import Link from 'next/link'
import { ContentAccordion } from './content-accordion'


const getSwgtQuizes = async (docId) => {
    //console.log("DOCID",docId)
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
                ...doc.data() ,
                id:doc.id
            }))
        }
        resolve(result)
    }
)
}

const SWGTQuizes = async ({ id }) => {
    const {token,error} = await decodeToken()
    if(error || !token) return <div>{error}</div>

    const quizes = await getSwgtQuizes(id)
    //console.log("QUIZES",quizes.NOTES)

    return (
        <div>
            <h1 className='text-base font-semibold my-4'>Course Content</h1>
            <ContentAccordion title={`Subject Wise Tests (${quizes.SWGT.length})`} >
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
                    {
                        quizes.SWGT.map((quiz,index)=>
                            <SWGTQuizCard key={index} courseId={id} quizId={quiz.qid} title={quiz?.title} questions={quiz?.Data} type='SWGT'/>
                        )
                    }
                </div>
            </ContentAccordion>
            <ContentAccordion title={`Chapter Wise Tests (${quizes.CWT.length})`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
                    {
                        quizes.CWT.map((quiz,index)=>
                            <SWGTQuizCard key={index} courseId={id} quizId={quiz.qid} title={quiz?.title} questions={quiz?.Data} type='CWT'/>
                        )
                    }
                </div>
            </ContentAccordion>            
            <ContentAccordion title={`Notes (${quizes.NOTES.length})`}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
                    {
                        quizes.NOTES.map((note,index)=>
                            <NoteCard key={index} course={id} id={note.id} title={note.title} preview={note.preview} description={note.description} paid={note.paid}/>
                        )
                    }
                </div>
            </ContentAccordion>            
        </div>
    )
}

const NoteCard = ({title,file,preview,description,paid,course,id}) => {
    return (
        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col gap-2'>
            <h1 className='text-lg font-semibold'>{title}</h1>
            <p className='text-sm text-gray-500'>{description}</p>
            <div className='flex gap-2 items-center'>
                <Link href={`/exclusive/courses/${course}/note/${id}`} target='_blank' className='text-blue-500'>Download</Link>
                <a href={preview} target='_blank' className='text-blue-500'>Preview</a>
            </div>
        </div>
    )
}

export default SWGTQuizes


