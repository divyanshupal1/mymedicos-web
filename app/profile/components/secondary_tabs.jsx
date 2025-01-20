import React from 'react'

export const SecondaryTabs = ({tabs,activeTab,setActiveTab,mainActive}) => {
    
    const pillRef = React.useRef(null)
    const containerRef = React.useRef(null)

    React.useEffect(() => {
        const container = containerRef.current
        const pill = pillRef.current

        const tabItems = container.children

        const tabWidth = tabItems[activeTab].offsetWidth
        const left =  tabItems[activeTab].getBoundingClientRect().left - container.getBoundingClientRect().left

        pill.style.width = `${tabWidth}px`
        pill.style.left = `${left}px`
        
    }, [activeTab,mainActive])

    return (
        <div ref={containerRef} className='relative w-full p-1 mx-auto flex items-center justify-evenly *:text-center  *:p-2'>
            {
                tabs.map((tab,index)=>(
                    <div key={index} onClick={()=>setActiveTab(index)} className={`z-10 cursor-pointer w-fit min-w-[100px] px-6 shrink-0 ${activeTab==index?"text-primary":""}`}>{tab.name}</div>
                ))
            }
            <div ref={pillRef} className='absolute h-1 rounded-t-md bottom-0 bg-primary !p-0 transition-all duration-300 pointer-events-none'></div>
        </div>
    )
}