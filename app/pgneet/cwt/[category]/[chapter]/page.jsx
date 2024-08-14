import React from 'react'
import { doc, getDocs,getDoc, query, where,collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import QuizCard from '@/app/pgneet/components/quiz_card';


const QuizListPage = async ({params}) => {

    let chapter = params.chapter.replace("%20"," ")
    let category = params.category.replace("%20"," ")
    let quizes = []
    const QuizRef = collection(db, "PGupload", "CWT","Quiz");
    const q = query(QuizRef, where("index", "==", chapter));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        quizes.push(doc.data())
    });

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
            <div className='mt-[5%]'>
                <div className='text-[#35AA86] font-bold text-lg'>{chapter}</div>
                <div className=''>Select quiz to start</div>
            </div>
            <div className='subjects w-full mt-8 pl-7 flex gap-x-2 flex-wrap gap-y-2 max-md:justify-center'>
                {
                    quizes.map((quiz,index) => (
                        <QuizCard key={index} title={quiz.title} id={quiz.qid} speciality={`${category}/${chapter}`} category={"cwt"}/>
                    ))
                }
            </div>
        </div>
    )
}

export default QuizListPage


