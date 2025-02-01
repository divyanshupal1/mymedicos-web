import React from 'react'

const Precesion = () => {
    return (
        <section className='w-full my-6 flex flex-col items-center border-dashed border-2 border-gray-200 p-8 rounded-lg max-w-7xl mx-auto bg-[#F6FCFB]'>
            <div className='w-full flex flex-col md:flex-row-reverse items-start justify-start gap-4'>
                <div className='flex flex-col items-start w-full '>
                    <h1 className='text-2xl font-semibold text-left w-full'>Precision at Your Fingertips</h1>
                    <p className='text-lg text-gray-600 mt-4 max-w-lg'>mymedicos offers an extensive suite of 238+ medical calculators tailored for doctors and healthcare professionals. These calculators are designed to simplify complex computations and enhance decision-making efficiency in clinical practice.</p>
                </div>
                <div className=''>
                    <img src='/learn.png' className='w-full aspect-square scale-x scale-x-[-1]' alt={"dsf"} />
                </div>
            </div>
        </section>
    )
}

export default Precesion