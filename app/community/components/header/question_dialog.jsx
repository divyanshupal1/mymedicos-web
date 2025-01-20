import React from 'react'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaRegQuestionCircle } from "react-icons/fa";
import { TagInput } from './tag_input'
import { useCommunityStore } from '@/store/useCommunityStore'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

const QuillEditor = dynamic(() => import('../QuillEditor'), { ssr: false })


export const QuestionDialog = () => {

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [tags, setTags] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const {toast} = useToast();

    const {createQuestion} = useCommunityStore((state)=>({
        createQuestion:state.createQuestion
    }))

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await createQuestion(title, content, tags);
        if(res.success){
            toast({
                title: 'Question added successfully',
            })
            setLoading(false)
        }else{
            toast({
                title:"Something went wrong!",
                variant:"destructive"
            })
            setLoading(false);
        }
    }

    return (
        // <div className="max-w-3xl mx-auto p-6">
        <Dialog>
            <DialogTrigger asChild>
                <Button asChild variant="ghost" size="sm" className="rounded-full w-full hover:bg-primary hover:text-white">
                    <span><FaRegQuestionCircle className='scale-125' /></span>
                    <span>Ask </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-hidden max-md:min-h-[calc(100vh-20px)] flex flex-col justify-start items-start">
                <DialogTitle className="mb-0 h-10" >Ask a question</DialogTitle>
                {/* <div className="bg-white rounded-lg shadow-lg p-6"> */}

                    <form onSubmit={handleSubmit} className="space-y-6 h-full flex-grow flex flex-col items-start justify-start *:w-full w-full">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Title
                            </label>
                            <Input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What would you like to ask or share?"                                
                                required
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="tags" 
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Tags (max 5)
                            </label>
                            <TagInput
                                tags={tags}
                                onChange={setTags}
                                maxTags={5}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <Textarea
                                type="text"
                                id="Description"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Describe your question ?"                                
                            />
                        </div>

                        

                    </form>
                        <div className="flex justify-end gap-2 items-center mt-auto w-full">
                            <DialogClose asChild>
                                <Button variant="ghost" className="rounded-full">Cancel</Button>
                            </DialogClose>
                            <Button className="rounded-full" loading={loading} onClick={handleSubmit}>Add Question</Button>
                        </div>
                {/* </div> */}
            </DialogContent>
        </Dialog>

        // </div>

    )
}
