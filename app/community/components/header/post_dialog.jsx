import React from "react";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdPostAdd } from "react-icons/md";
import { TagInput } from "./tag_input";
import { useToast } from "@/components/ui/use-toast";
import { useCommunityStore } from "@/store/useCommunityStore";

const QuillEditor = dynamic(() => import("../QuillEditor"), { ssr: false });

export const PostDialog = ({
  dialogTitle,
  button_text,
  questionId,
  children,
}) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const {toast} = useToast()

  const {createPost} = useCommunityStore((state)=>({
    createPost:state.createPost
  }))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await createPost(title, content, tags);
    if(res.success){
        toast({
            title: 'Post added successfully',
        })
        setLoading(false)
    }else{
        toast({
            title:"Something went wrong!",
            variant:"destructive"
        })
        setLoading(false);
    }
  };

  return (
    // <div className="max-w-3xl mx-auto p-6">
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-full hover:bg-primary hover:text-white"
          >
            <span>
              <MdPostAdd className="scale-125" />
            </span>
            <span>Post </span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="overflow-hidden max-md:min-h-[calc(100vh-20px)] flex flex-col justify-start items-start">
        <DialogTitle>{dialogTitle ? dialogTitle : "Create a post"}</DialogTitle>
        {/* <div className="bg-white rounded-lg shadow-lg p-6"> */}

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
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
              placeholder="What would you like to share?"
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
            <div className="prose max-w-none">
              <QuillEditor value={content} onChange={setContent} />
            </div>
          </div>

        </form>
          <div className="flex justify-end gap-2 items-center mt-auto w-full">
            <DialogClose asChild>
              <Button variant="ghost" className="rounded-full">
                Cancel
              </Button>
            </DialogClose>
            <Button className="rounded-full" loading={loading} onClick={handleSubmit}>{button_text ? button_text : "Add Post"}</Button>
          </div>
        {/* </div> */}
      </DialogContent>
    </Dialog>

    // </div>
  );
};
