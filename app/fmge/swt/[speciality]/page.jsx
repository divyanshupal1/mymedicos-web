import React from 'react'
import { doc, getDocs, query, where,collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import QuizCard from '../../components/quiz_card';
import QuizList from '../../components/quiz_list';


const QuizListPage = async ({params}) => {

    let speciality = params.speciality.replaceAll("%20"," ")
    let quizes = []

    const QuizRef = collection(db, "Fmge", "Weekley","Quiz");
    const q = query(QuizRef, where("speciality", "==", speciality));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        quizes.push(doc.data())
    });
    quizes = quizes.map(quiz => ({...quiz,Data:null}))
    

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
            <div className='mt-[5%]'>
                <div className='text-[#35AA86] font-bold text-lg'>{speciality}</div>
                <div className=''>Subject wise tests</div>
            </div>
            <QuizList quizes={JSON.stringify(quizes)} category={"swt"} section={'fmge'}/>
        </div>
    )
}

export default QuizListPage


// section : /pgnee
// category : /swt
//speciality : /anatomy
//chapter : /introduction
//quiz.id : /1