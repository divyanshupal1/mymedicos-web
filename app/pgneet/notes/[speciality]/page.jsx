import React from 'react'
import { getDocs, query, where,collection } from "firebase/firestore";
import { db } from '@/lib/firebase';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';


const QuizListPage = async ({params}) => {

    let speciality = params.speciality.replaceAll("%20"," ")
    let notes = []

    const notesRef = collection(db, "PGupload", "Notes","Note");
    const q = query(notesRef, where("speciality", "==", speciality));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        notes.push(doc.data())
    });
    

    return (
        <div className='w-full h-auto p-4 max-w-5xl mx-auto '>
            <div className='mt-[5%]'>
                <div className='text-[#35AA86] font-bold text-lg'>{speciality}</div>
                <div className=''>Notes</div>
            </div>
            <div className='w-full mt-5'>
            {
                notes.map((note,index) => (
                    <NoteCard note={note} key={index} />
                ))
            }
            </div>
        </div>
    )
}

export default QuizListPage


const NoteCard =  ({note}) => {
    return (
        <div className='max-w-3xl mx-auto w-full border border-neutral-100 shadow-sm rounded-md p-4'>
            <div className='text-[#35AA86] font-bold text-base'>{note?.Title}</div>
            <div className='text-sm mt-2' dangerouslySetInnerHTML={{__html:note?.Description}}></div>
            <div className='flex items-center justify-between gap-x-3 mt-4'>
                <Link className={cn(buttonVariants({variant:"secondary",size:"sm"}),"w-full")} href={note?.file} target='_blank'>Preview</Link>
                <Link className={cn(buttonVariants({variant:"default",size:"sm"}),"w-full")} href={note?.pdf} target='_blank'>Download</Link>
            </div>
        </div>
    )
}


// section : /pgnee
// category : /swt
//speciality : /anatomy
//chapter : /introduction
//quiz.id : /1