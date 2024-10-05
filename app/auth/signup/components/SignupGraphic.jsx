const SignupGraphic = () => {
    return (        
        <>
        <div className='w-full h-full  flex flex-col justify-center items-center p-12 relative'>
            <h1 className='font-bold text-xl text-center'>Signup</h1>
            <div className='flex flex-col gap-y-4 items-center justify-between mt-10'>
                <p className='text-center max-sm:text-sm'>Join India’s first Premier <span className='font-bold text-nowrap'>Medical Community app</span>,<br/>connecting healthcare experts seamlessly </p>
                <div className='max-md:hidden'>
                    <img src='/images/signup.svg' className='w-auto h-auto mt-8' />
                </div>
                <p className='flex gap-x-2 items-center md:absolute bottom-10'>
                    <span className='text-sm font-semibold'>MADE IN BHARAT</span>
                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0898 0.943199C9.8005 0.643439 9.45595 0.405678 9.07616 0.243747C8.69638 0.0818217 8.28892 -0.00103676 7.87762 9.79147e-06C7.46626 -0.00103676 7.05887 0.0818217 6.67909 0.243747C6.2993 0.405678 5.95474 0.643439 5.66546 0.943199L5.48899 1.13054L5.31252 0.949653C4.72747 0.350023 3.93401 0.0131563 3.10666 0.0131563C2.27932 0.0131563 1.48585 0.350023 0.900804 0.949653C0.323411 1.55346 0 2.36524 0 3.21073C0 4.05623 0.323411 4.86802 0.900804 5.47179L5.16757 9.85826C5.25618 9.94903 5.37631 10 5.5016 10C5.62683 10 5.74702 9.94903 5.83563 9.85826L10.1024 5.47179C10.68 4.86601 11.0023 4.0519 11 3.20485C10.9977 2.3578 10.6707 1.54559 10.0898 0.943199Z" fill="url(#paint0_linear_300_1994)"/>
                        <defs>
                            <linearGradient id="paint0_linear_300_1994" x1="5.5" y1="0" x2="5.5" y2="10" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#706F6F"/>
                                <stop offset="0.9999" stopColor="#312626"/>
                                <stop offset="1" stopColor="#D6D3D3"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </p>
            </div>
        </div>
        </>
    )
}

export default SignupGraphic