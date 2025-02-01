import React from 'react'

const LearnSmart = () => {
    return (
        <section className='w-full my-6 flex flex-col items-center border-dashed border-2 border-gray-200 p-8 rounded-lg max-w-7xl mx-auto bg-[#F6FCFB]'>
            <h1 className='text-2xl font-semibold text-left w-full'>Learn Smart, Excel Faster!</h1>
            <div className='w-full flex flex-col md:flex-row items-start justify-start gap-4'>
                <div className='flex flex-col items-start w-full '>
                    <p className='text-lg text-gray-600 mt-4 max-w-lg'>MedMy is the innovative edtech segment of mymedicos, designed to transform medical education and exam preparation. It provides comprehensive resources, including chapter-wise and subject-specific tests, extensive MCQ banks, and grand tests tailored for exams like NEET PG, FMGE, NEET SS, and MBBS. Powered by AI-driven insights, MedMy offers personalized learning experiences, curated notes, and interactive slideshares to enhance retention and understanding. With a focus on flexibility, affordability, and global reach, MedMy empowers medicos to achieve their academic and professional goals seamlessly.</p>
                    <div className='grid grid-cols-2 gap-4 mt-8 '>
                        <div className='flex flex-col items-start justify-start'>
                            <h3 className='font-medium text-lg'>30+</h3>
                            <p className='text-sm'>Experience Teachers</p>
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h3 className='font-medium text-lg'>25+</h3>
                            <p className='text-sm'>Chapters in each Speciality</p>
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h3 className='font-medium text-lg'>18349+</h3>
                            <p className='text-sm'>High yield questions</p>
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h3 className='font-medium text-lg'>9267+</h3>
                            <p className='text-sm'>Happy Students</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img src='/learn.png' className='w-full aspect-square' alt={"dsf"} />
                </div>
            </div>
        </section>
    )
}

export default LearnSmart