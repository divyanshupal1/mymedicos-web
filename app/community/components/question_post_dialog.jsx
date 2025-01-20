import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false })


const QuestionPostDialog = () => {

    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({ title, content });
    }

    return (
        // <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          {/* <PenLine className="w-6 h-6 text-blue-600" /> */}
          <h1 className="text-2xl font-bold text-gray-800">Create a Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to ask or share?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <div className="prose max-w-none">
              <QuillEditor
                value={content}
                onChange={setContent}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    // </div>

    )
}

export default QuestionPostDialog