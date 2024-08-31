import React from 'react'
import { doc, getDocs,getDoc, query, where,collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import QuizCard from '../../components/quiz_card';
import CategoryCard from '../../components/category_card';


const ChapterListPage = async ({params}) => {

    let speciality = params.speciality.replaceAll("%20"," ")

    const chapterDocRef = doc(db, "Fmge", "Indexs","Index",speciality); 
    const chapterDoc = await getDoc(chapterDocRef)
    const chapter = chapterDoc.data()?.['Data'] || []

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
            <div className='mt-[5%]'>
                <div className='text-[#35AA86] font-bold text-lg'>{speciality}</div>
                <div className=''>Select a chapter </div>
            </div>
            <div className='subjects w-full mt-8 pl-7 flex gap-x-2 flex-wrap gap-y-2 max-md:justify-center'>
                {
                    chapter.map((chapter,index) => 
                        <CategoryCard 
                            key={index} 
                            title={chapter}
                            section={"fmge"}
                            category={`cwt`}
                            speciality={`${speciality}/${chapter}`}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ChapterListPage


