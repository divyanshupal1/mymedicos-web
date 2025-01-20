"use client"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { useUserStore } from '@/store/userStore'
import { Button } from '@/components/ui/button'
import { FaRegQuestionCircle } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { MdPostAdd } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import QuestionPostDialog from './question_post_dialog'
import { QuestionDialog } from './header/question_dialog'
import { PostDialog } from './header/post_dialog'
import { FlashCardDialog } from './header/flashcard_dialog'


const CommunityHeader = () => {
    const { loggeduser } = useUserStore((state) => ({
        loggeduser: state.user,
    }))
    return (
        <div className='w-full p-2 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-sm bg-neutral-50 dark:bg-neutral-900 space-y-1'>
            <div className='flex items-center justify-between gap-3 p-1'>
                <Avatar className="w-8 h-8">
                    <AvatarImage src={loggeduser?.photoURL} />
                    <AvatarFallback>{loggeduser?.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='bg-white border border-neutral-300 dark:border-gray-950 dark:bg-neutral-800 p-1.5 px-6 rounded-full w-full text-sm'>
                    What do you want to ask or share?
                </div>
            </div>
            <div className='flex divide-x-2 divide-neutral-300 *:px-1 *:text-sm'>
                <div className='w-full'>
                    <QuestionDialog/>
                </div>
                <div className='w-full'>
                    <FlashCardDialog/>
                </div>
                <div className='w-full'>
                    <PostDialog/>
                </div>
            </div>
        </div>
    )
}

export default CommunityHeader