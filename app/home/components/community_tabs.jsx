/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'

const CommunityTabs = () => {
    const tabs = [
        { 
            title: "Ask and Answer",
            description:"A dedicated feature within the mymedicos app that enables users to ask questions, seek advice, and share knowledge with the medical community. It fosters collaborative learning and provides access to diverse insights and expertise from medicos worldwide.",
            img: '/images/landing-graphic-1.svg' 
        }, { 
            title: "Peer Interaction",
            description:"Peer Interaction feature within the mymedicos app that enables users to ask questions, seek advice, and share knowledge with the medical community. It fosters collaborative learning and provides access to diverse insights and expertise from medicos worldwide.",
            img: '/images/landing-graphic-2.svg'  
        }, { 
            title: "Expert Insights",
            description:"Expert Insights feature within the mymedicos app that enables users to ask questions, seek advice, and share knowledge with the medical community. It fosters collaborative learning and provides access to diverse insights and expertise from medicos worldwide.",
            img: '/images/landing-graphic-3.svg'  
        }, { 
            title: "Resource Sharing",
            description:"Resource Sharing feature within the mymedicos app that enables users to ask questions, seek advice, and share knowledge with the medical community. It fosters collaborative learning and provides access to diverse insights and expertise from medicos worldwide.",
            img: '/images/landing-graphic-4.svg'  
        }, { 
            title: "User Profiles",
            description:"User Profiles feature within the mymedicos app that enables users to ask questions, seek advice, and share knowledge with the medical community. It fosters collaborative learning and provides access to diverse insights and expertise from medicos worldwide.",
            img: '/images/landing-graphic-4.svg'  
        }]
    const [activeTab, setActiveTab] = React.useState(0)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setActiveTab(activeTab => activeTab === tabs.length - 1 ? 0 : activeTab + 1)
        }, 6000)
        return () => clearTimeout(timeOut)
    }, [activeTab, tabs.length])

    return (
        <section className='w-full my-6 flex flex-col items-center border-dashed border-2 border-gray-200 p-8 rounded-lg max-w-7xl mx-auto bg-[#F6FCFB]'>
            <h1 className='text-2xl font-semibold text-left w-full'>Community: Connecting Medicos Globally</h1>
            <div className='w-full flex-wrap flex items-center justify-start gap-4 mt-8'>
                {
                    tabs.map((tab, index) => (
                        <div key={index} className={`flex whitespace-nowrap items-center border justify-center gap-2 p-2 px-4 cursor-pointer ${activeTab === index ? 'bg-[#00DDB3] text-white' : 'bg-transparent text-gray-700'} rounded-full`} onClick={() => setActiveTab(index)}>
                            <p>{tab.title}</p>
                        </div>
                    ))
                }
            </div>
            <div className='w-full flex flex-col md:flex-row items-start justify-start gap-4 mt-8'>
                <div className='flex flex-col items-start w-full mt-8'>
                    <h2 className='text-xl font-semibold'>{tabs[activeTab].title}</h2>
                    <p className='text-lg text-gray-600 mt-4 max-w-lg'>{tabs[activeTab].description}</p>
                </div>
                <div>
                    <img src={tabs[activeTab].img} className='w-full aspect-square' alt={tabs[activeTab].title}/>
                </div>
            </div>
        </section>
    )
}

export default CommunityTabs