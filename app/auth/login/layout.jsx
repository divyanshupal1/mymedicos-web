import React from 'react'
import Link from 'next/link'

const Layout = ({children}) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <Link href={'/'} className='w-full p-3 px-6'>
                <img src="/images/logo.svg" className='h-8'/>
            </Link>
            <div className='w-full h-auto flex-grow p-12 max-sm:p-4 max-sm:pt-0 pt-0'>
                {children}  
            </div>
        </div>
    )
}

export default Layout