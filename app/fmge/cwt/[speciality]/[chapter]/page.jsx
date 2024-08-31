import React from 'react'
import {getDocs, query, where,collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import QuizList from '@/app/pgneet/components/quiz_list';


const QuizListPage = async ({params}) => {

    let chapter = params.chapter.replaceAll("%20"," ")
    chapter = chapter.replaceAll("%26","&")
    chapter = chapter.replaceAll("%3A",":")
    chapter = chapter.replaceAll("%2C",",")
    // let category = params.speciality.replace("%20"," ")
    let quizes = []
    const QuizRef = collection(db, "Fmge", "CWT","Quiz");
    const q = query(QuizRef, where("index", "==", chapter));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        quizes.push(doc.data())
    });
    quizes = JSON.stringify(quizes)

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
            <div className='mt-[5%]'>
                <div className='text-[#35AA86] font-bold text-lg'>{chapter}</div>
                <div className=''>Select quiz to start</div>
            </div>
            <QuizList quizes={quizes} category={"cwt"} section={'fmge'}/>
        </div>
    )
}

export default QuizListPage


