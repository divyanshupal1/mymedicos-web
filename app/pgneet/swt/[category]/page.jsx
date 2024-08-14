import React from 'react'
import { doc, getDocs, query, where,collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import QuizCard from '../../components/quiz_card';


const QuizListPage = async ({params}) => {

    let category = params.category.replace("%20"," ")
    let quizes = []

    const QuizRef = collection(db, "PGupload", "Weekley","Quiz");
    const q = query(QuizRef, where("speciality", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        quizes.push(doc.data())
    });
    

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
            <div className='mt-[5%]'>
                <div className='text-[#35AA86] font-bold text-lg'>{category}</div>
                <div className=''>Subject wise tests</div>
            </div>
            <div className='subjects w-full mt-8 pl-7 flex gap-x-2 flex-wrap gap-y-2 max-md:justify-center'>
                {
                    quizes.map((quiz,index) => (
                        <QuizCard key={index} title={quiz.title} id={quiz.qid} speciality={category} category={"swt"}/>
                    ))
                }
            </div>
        </div>
    )
}

export default QuizListPage


