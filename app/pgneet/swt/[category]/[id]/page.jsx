import React from 'react'
import { doc, getDoc} from "firebase/firestore";
import { db } from '@/lib/firebase';
import TestPage from "./TestPage"

const QuizAnswer = async ({params}) => {

    const categoriesRef = doc(db, "PGupload","Weekley","Quiz", params.id);
    const docSnap = await getDoc(categoriesRef);
    let quizData = docSnap.data()
    quizData = JSON.stringify(quizData)

    return  <TestPage quizData={quizData} category={"pgneet"}/>
}

export default QuizAnswer