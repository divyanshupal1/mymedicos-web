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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button asChild variant="ghost" size="sm" className="rounded-full w-full hover:bg-primary hover:text-white">
                                <span><FaRegQuestionCircle className='scale-125' /></span>
                                <span>Ask </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0 overflow-hidden">
                            <DialogTitle className="hidden">Ask a question</DialogTitle>
                            <div>Under construction</div>
                            {/* <QuestionPostDialog/> */}
                        </DialogContent>
                    </Dialog>

                </div>
                <div className='w-full'>
                    <Button variant="ghost" size="sm" className="rounded-full w-full hover:bg-primary hover:text-white">
                        <span><HiPencilSquare className='scale-125' /></span>
                        <span>Answer </span>
                    </Button>
                </div>
                <div className='w-full'>
                    <Button variant="ghost" size="sm" className="rounded-full w-full hover:bg-primary hover:text-white">
                        <span><MdPostAdd className='scale-125' /></span>
                        <span>Post</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CommunityHeader