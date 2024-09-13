import React from 'react'

const GridSection = () => {
  return (
    <div className='w-full h-[90vh] p-4 mt-[5%] overflow-hidden'>
        <div className='w-full h-full md:h-1/2 flex gap-x-4 gap-y-4 flex-col md:flex-row'>
            <div className='h-full w-full md:w-2/3 bg-gradient-to-b from-[#00BFA6] to-[#03755A] rounded-lg relative p-4 px-8 text-white flex flex-col items-start justify-center  overflow-hidden'>
                <img src='/images/image.png' className='w-full h-full absolute'/>
                <div className='text-2xl font-bold'>
                    Concept-Based Learning
                </div>
                <p className='max-w-sm mt-4'>mymedicos MCQs are meticulously crafted to ensure a thorough understanding of core concepts before addressing specific details. Our approach emphasizes high-yield topics and frequently repeated MCQs, providing a robust conceptual framework essential for mastering the material.</p>
            </div>
            <div className='h-full w-full md:w-1/3 bg-gradient-to-b from-[#2DC0C9] to-[#2F2E41] rounded-lg relative p-4 px-8 text-white flex flex-col items-start justify-center  overflow-hidden'>
                <img src='/images/image.png' className='w-full h-full absolute'/>
                <div className='text-2xl font-bold'>
                    Concept-Based Learning
                </div>
                <p className='max-w-sm mt-4'>mymedicos MCQs are meticulously crafted to ensure a thorough understanding of core concepts before addressing specific details. Our approach emphasizes high-yield topics and frequently repeated MCQs, providing a robust conceptual framework essential for mastering the material.</p>
            </div>
        </div>
        <div className='w-full h-1/2 bg-gradient-to-b from-[#9584FF] to-[#0D153F] rounded-lg mt-4 overflow-hidden relative p-4 px-8 text-white flex flex-col items-start justify-center' >
            <img src='/images/image.png' className='w-full h-full absolute'/>
            <div className='text-2xl font-bold'>
                    Concept-Based Learning
                </div>
                <p className='max-w-5xl mt-4'>mymedicos MCQs are meticulously crafted to ensure a thorough understanding of core concepts before addressing specific details. Our approach emphasizes high-yield topics and frequently repeated MCQs, providing a robust conceptual framework essential for mastering the material.</p>
        </div>
    </div>
  )
}

export default GridSection