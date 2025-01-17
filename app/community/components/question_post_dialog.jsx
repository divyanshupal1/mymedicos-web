import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false })


const QuestionPostDialog = () => {

    const [description, setDescription] = React.useState('')
    return (
        <Tabs defaultValue="account" className="w-full max-md:h-[calc(100vh-4rem)]">
            <TabsList className="w-full p-0 h-14 rounded-none overflow-hidden border-b">
                <TabsTrigger value="question" className="w-full h-full data-[state=active]:bg-primary/50 rounded-t-md rounded-b-none">Ask Question</TabsTrigger>
                <TabsTrigger value="post" className="w-full h-full data-[state=active]:bg-primary/50 rounded-t-md rounded-b-none">Create Post</TabsTrigger>
            </TabsList>
            <TabsContent value="question" className="w-full h-full p-6">
                <div className='flex gap-3 flex-col '>
                    <Label>Question</Label>
                    <input type="text" placeholder="What is your question?"
                        className='outline-none focus-within:outline-none bg-transparent border-b border-neutral-300  dark:border-gray-700 focus-within:dark:border-white p-1'
                    />
                </div>
                <div className='flex gap-3 flex-col mt-8'>
                    <Label>Description (optional)</Label>
                    <QuillEditor value={description} onChange={(val)=>setDescription(val)} />
                </div>
                <div className='flex gap-3 items-center justify-end mt-12'>
                    <DialogClose>
                        <Button variant="ghost" className="rounded-full" >Cancel</Button>
                    </DialogClose>
                    <Button variant="default" className="rounded-full">Ask Question</Button>
                </div>
            </TabsContent>
            <TabsContent value="post" className="w-full p-6">
                <div className='flex gap-3 flex-col '>
                    <Label>Post Title</Label>
                    <input type="text" placeholder="Title of your post?"
                        className='outline-none focus-within:outline-none bg-transparent border-b border-neutral-300  dark:border-gray-700 focus-within:dark:border-white p-1'
                    />
                </div>
                <div className='flex gap-3 flex-col mt-8'>
                    <Label>Description (optional)</Label>
                    <input type="text" placeholder="Description of your post"
                        className='outline-none focus-within:outline-none bg-transparent border-b border-neutral-300  dark:border-gray-700 focus-within:dark:border-white p-1'
                    />
                </div>
                <div className='flex gap-3 items-center justify-end mt-12'>
                    <DialogClose>
                        <Button variant="ghost" className="rounded-full" >Cancel</Button>
                    </DialogClose>
                    <Button variant="default" className="rounded-full">Add Post</Button>
                </div>
            </TabsContent>
        </Tabs>

    )
}

export default QuestionPostDialog