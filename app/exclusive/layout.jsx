import React from 'react'
import ExclusiveNavbar from './components/exclusive_navbar'

const ExclusiveLayout = ({children}) => {
    return (
        <div className='w-full h-auto'>
            <div className='w-full h-[50px] shadow-sm bg-green-50'>
                <ExclusiveNavbar/>
            </div>
            {children}

        </div>
    )
}

export default ExclusiveLayout