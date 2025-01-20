"use client"

import React from 'react'

const SwitchTabs = ({activeTab,setActiveTab}) => {

    const pillRef = React.useRef(null)
    const containerRef = React.useRef(null)

    React.useEffect(() => {
        const container = containerRef.current
        const pill = pillRef.current

        const tabs = container.children

        const tabWidth = tabs[0].offsetWidth
        const tabHeight = tabs[0].offsetHeight

        pill.style.width = `${tabWidth}px`
        pill.style.height = `${tabHeight}px`
        pill.style.transform = `translateX(${activeTab * tabWidth}px)`
        
    }, [activeTab])

    return (
        <div ref={containerRef} className='relative w-full p-1 bg-secondary max-w-sm mx-auto flex items-center *:w-1/2 *:text-center rounded-full *:p-2 *:rounded-full'>
            <div onClick={()=>setActiveTab(0)} className={`z-10 cursor-pointer ${activeTab==0?"text-primary-foreground":""}`}>Community</div>
            <div onClick={()=>setActiveTab(1)} className={`z-10 cursor-pointer ${activeTab==1?"text-primary-foreground":""}`}>Medmy</div>
            <div ref={pillRef} className='absolute h-full w-1/2 bg-primary !p-0 transition-all duration-300 pointer-events-none'></div>
        </div>
    )
}

export default SwitchTabs