import React from 'react'

const Layout = ({children}) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full p-3 px-6  sticky top-0'>
                <img src="/images/logo.svg" className='h-8'/>
            </div>
            <div className='w-full h-auto flex-grow'>
                {children}  
            </div>
        </div>
    )
}

export default Layout