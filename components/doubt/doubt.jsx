/* eslint-disable @next/next/no-img-element */
"use client"
import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { MdChat, MdClose, MdSend } from 'react-icons/md'

const Doubt = () => {
    const [show, setShow] = React.useState(false)
    const {activeChatId,setActiveChatId,dataloaded,loadChatData} = useChatStore(state=>({
        activeChatId:state.activeChatId,
        setActiveChatId:state.setActiveChatId,
        dataloaded:state.dataloaded,
        loadChatData:state.loadChatData
    }))
    const {user} = useUserStore(state=>state)

    const close = () => {
        setShow(false)
        setActiveChatId(null)
    }

    React.useEffect(()=>{
        if(!dataloaded) loadChatData(user)
    },[dataloaded,loadChatData,user])

    return (
        <>
            <div onClick={()=>setShow(!show)} className='fixed bottom-4 right-8 p-4 rounded-full bg-green-600 text-green-50 drop-shadow-lg cursor-pointer z-[100]'>
                <div className='scale-150'>{show?<MdClose/>:<MdChat/>}</div>
            </div>
            {   
                show &&
                <div className='fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-green-50/30 backdrop-blur-sm z-[150] shadow-sm '>
                    <div className='relative w-full border flex max-w-7xl h-[98vh] max-md:h-full max-h-[1000px] bg-green-50 rounded-lg shadow-md overflow-hidden border-neutral-200 z-[200]'>
                        <div className={`w-[400px] max-md:w-full h-full flex-grow-0 bg-neutral-50 border-r border-neutral-200 ${activeChatId?"max-md:hidden":""}`}>
                            <DoubtSidebar close={close}/>
                        </div>
                        <div className={`w-full h-full bg-green-50 flex flex-col relative ${activeChatId?"":"max-md:hidden"}`}>
                            <DoubtChat close={close}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Doubt

const DoubtSidebar = ({close}) => {
    const {chats,activeChatId} = useChatStore(state=>state)
    //console.log(chats)
    return (
        <>
            <div className='flex gap-x-3 items-center justify-start h-[60px] px-4  bg-neutral-100 border-b border-neutral-200'>
                <img src='/images/logo.svg' alt='logo' className='h-[30px] w-auto'/>
                <span className='text-2xl font-bold text-center block mb-[4px] '>Doubt+</span>
            </div>
            <div className='flex flex-col items-start justify-start h-full overflow-y-scroll custom-scroll *:border-b *:border-neutral-200'>
                {
                    chats?.all?.map((chat,i)=>
                        <ChatItem key={i} chat={chat} active={activeChatId===chat.id}/>
                    )
                }
            </div>
        </>
    )
}

const ChatItem = ({chat,active}) => {
    const {setActiveChatId,chats} = useChatStore(state=>state)
    const {user} = useUserStore(state=>state)
    return (
        <div 
            onClick={()=>setActiveChatId(user,chat.id)}
            className={`w-full p-4 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis relative flex-shrink-0 ${active?'bg-[#2BD0BF] text-white shadow-sm':''}`}
        >
            {chat?.mentor?.name || chat?.name}
            {chats?.new?.includes(chat.id) && <div className=' px-2 bg-green-500 rounded-full absolute right-4 top-1/2 -translate-y-1/2'>new message</div>}
        </div>
    )
}

const DoubtChat = ({close}) => {
    const {activeChatId,messages} = useChatStore(state=>state)
    return (

        <>
            <ChatNavbar close={close}/>
            {activeChatId && <MessagesDisplay/>}
            <MessageSend/>
        </>
        
    )
}


const ChatNavbar =  ({close}) => {
    const {chats,activeChatId,setActiveChatId} = useChatStore(state=>state)
    const chat = chats?.all?.find(chat=>chat.id===activeChatId)
    return (
        <div className='w-full h-[60px] border-b border-neutral-200 bg-[#2BD0BF] sticky top-0  z-10 flex items-center justify-between px-3'>
            <div className='flex items-center gap-x-3 w-full'>
                <div className='rounded-full p-2 bg-neutral-100/50 md:hidden cursor-pointer ' onClick={()=>setActiveChatId("null",null)}><ChevronLeft/></div>
                <span className='overflow-hidden whitespace-nowrap text-ellipsis max-w-md'>{chat?.name}</span>
            </div>
            <div className='absolute right-3 top-1/2 -translate-y-1/2'>
                <button onClick={close} className='p-2 rounded-full bg-neutral-100/50 ml-auto backdrop-blur-lg border border-neutral-200'><MdClose/></button>
            </div>
        </div>
    )
}

const MessagesDisplay = () => {
    const {activeChatId,messages,unsubscribe,subscribeToChat} = useChatStore(state=>state)
    const {user} = useUserStore(state=>state)
    const messageContainer = React.useRef(null)

    React.useEffect(()=>{
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    }, [messages,activeChatId])

    React.useEffect(()=>{
        let unsubscribe= null
        if(activeChatId){
            unsubscribe = subscribeToChat(user,activeChatId)
        }
        return ()=>unsubscribe()
    },[activeChatId,unsubscribe,subscribeToChat,user])

    if(activeChatId==null) return <></>
    //console.log(messages[activeChatId])

    return (
        <div ref={messageContainer} className='px-4 py-20 max-h-full w-full overflow-y-scroll custom-scroll absolute bottom-0'>
                {
                    messages[activeChatId]?.map((message,i)=>
                        <MessageItem key={i} message={message}/>
                    )
                }
        </div>
    )
}

const MessageItem = ({message}) => {
    return (
        <div className='w-full p-1 '>
            <div className={`w-fit p-1.5 rounded-lg px-4 max-w-[400px] ${message?.sender=="user"?"ml-auto bg-green-300":"mr-auto bg-neutral-200"}`}>
                {message?.message}
            </div>
        </div>
    )
}

const MessageSend = () => {
    const {activeChatId} = useChatStore(state=>state)
    const [message, setMessage] = React.useState('')

    const {sendMessage} = useChatStore(state=>state)
    const {user} = useUserStore(state=>state)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        //console.log(message)
        sendMessage(user,activeChatId,message)
        setMessage('')
    }

    if(activeChatId==null) return <></>
    return (
        <form onSubmit={handleOnSubmit} className='w-[calc(100%-50px)] absolute bottom-2  left-1/2 -translate-x-1/2 '>
            <input value={message} onChange={(e)=>setMessage(e.target.value)} type='text' className='w-full p-4 shadow-lg border outline-none border-green-200 rounded-full overflow-hidden bg-neutral-50'/>
            <button type='send' className='absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 p-3 rounded-full cursor-pointer'>
                <div className='scale-150 text-white'><MdSend/></div>
            </button>
        </form>
    )
}
