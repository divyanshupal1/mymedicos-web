import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import CategoryCard from '../components/category_card';
import Header from '../components/header';


const NotesPage = async () => {

    const categoriesRef = doc(db, "Categories", "39liVyLEjII6dtzolxSZ");
    const docSnap = await getDoc(categoriesRef);
    let categories = docSnap.data()['All']
    categories.sort()

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto max-md:flex max-md:flex-col'>
            <div className='mt-[5%]'>
                <Header description='Select a subject to view notes' />
            </div>
            <div className='subjects w-full mt-8 pl-7 flex gap-x-2 flex-wrap gap-y-2 max-lg:justify-center'>
                {
                    categories.map((category,index) => (
                        <CategoryCard key={index} title={category} category={"notes"} speciality={category} section={"fmge"} />
                    ))
                }
            </div>
        </div>
    )
}

export default NotesPage


