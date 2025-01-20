"use client";
import React, { useEffect } from "react";
import { useCommunityStore } from "@/store/useCommunityStore";
import LoadingScreen from "@/components/ui/loading-screen";
import LikeButton from "./like_button/like_button";
import { MdOutlineModeComment } from "react-icons/md";
import { Clock } from "lucide-react";

export const PostCard = ({ postId,flashcard=false }) => {
  const { likePost, posts } = useCommunityStore((state) => ({
    likePost: state.likePost,
    posts: state.posts,
  }));

  const post = posts?.[postId];

  const [localLike, setLocalLike] = React.useState({
    liked: post.liked,
    likeCount: post.likeCount,
  });

  useEffect(() => {
    setLocalLike({
      liked: post.liked,
      likeCount: post.likeCount,
    });
  }, [post]);

  const handleLike = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setLocalLike({
      liked: !localLike.liked,
      likeCount: localLike.liked
        ? localLike.likeCount - 1
        : localLike.likeCount + 1,
    });
    await likePost(id);
  };

  const [showComments, setShowComments] = React.useState(false);

  return (
    <div className="bg-white dark:bg-card/20 border-b-[1px] border-neutral-300">
      <div className="flex items-center p-3">
        <UserAvatar name={post.author.name} img={post.author.photoURL} />
        <div className="ml-2">
          <div className="font-semibold">{post.author.name}</div>
          <div className="text-xs text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
      </div>
      <div className="p-3" dangerouslySetInnerHTML={{__html:post.body}}></div>
      <div className="flex p-4 gap-x-3">
        <button
          
          className="flex items-center p-0 h-fit bg-green-100/10 rounded-full px-2 pr-3"
        >
          <LikeButton id={post._id} checked={localLike.liked} handleLike={handleLike}/>
          <span className="text-sm">{localLike.likeCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center p-0 h-fit bg-green-100/10 rounded-full px-4 py-2 gap-x-2"
        >
          <MdOutlineModeComment />
          <span className="text-sm">{post.commentCount}</span>
        </button>
        <CommentsDrawer
          open={showComments}
          close={() => setShowComments(false)}
          postId={postId}
        />
        {flashcard && 
            <div className='flex items-center p-0 h-fit bg-green-100/50 rounded-full px-3 py-1 gap-x-1'>
                <Clock className='scale-75'/>
                <span className='text-sm whitespace-nowrap'>{post.readtime}min <span className='hidden md:inline'>Readtime</span></span>
            </div>
        }
      </div>
    </div>
  );
};

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useUserStore } from "@/store/userStore";
import UserAvatar from "@/components/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const commentContext = React.createContext({edit:null,setEdit:null,reply:null,setReply:null});

const CommentsDrawer = ({ postId, open, close }) => {

  const { getPostComments, postComments,commentOnPost } = useCommunityStore((state) => ({
    getPostComments: state.getPostComments,
    postComments: state.postComments,
    commentOnPost:state.commentOnPost
  }));

  const [selectedComment, setSelectedComment] = React.useState({
    edit:null,
    reply:null
  });
  const setEdit = (id) => setSelectedComment({...selectedComment,edit:id})
  const setReply = (id) => setSelectedComment({...selectedComment,reply:id})


  useEffect(() => {
    if (
      open &&
      !postComments?.[postId]?.loaded &&
      !postComments?.[postId]?.loading &&
      postComments?.[postId]?.data == null
    ) {
      getPostComments(postId);
    }
  }, [postComments, open, postId, getPostComments]);

  return (

    <Drawer open={open} onClose={close} className="md:hidden">
      <DrawerContent className="max-w-3xl mx-auto z-[1200] ">
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        {postComments[postId] && postComments[postId].loading && (
          <LoadingScreen />
        )}
        { 
          postComments?.[postId]?.data?.length ==0 && 
          <div className="w-full text-center p-3">
            <p>No comments</p>
          </div>
        }
        <commentContext.Provider value={{edit:selectedComment.edit,setEdit,reply:selectedComment.reply,setReply}}>
          <div className="max-h-[calc(100vh-100px)] relative overflow-y-auto  w-full px-3">
            {postComments?.[postId]?.data?.map((comment) => (
              <Comment 
                key={comment._id} 
                comment={comment} 
              />
            ))}
            <div className="p-3 sticky bottom-0 w-full bg-white ">
              {
                selectedComment.edit && <EditComment/>
              }{
                selectedComment.reply && <ReplyComment postId={postId}/>
              }
              {
                !selectedComment.edit && !selectedComment.reply && <AddComment postId={postId}/>
              }
            </div>
          </div>
        </commentContext.Provider>
        
        
      </DrawerContent>
    </Drawer>
  );
};

const Comment = ({ comment }) => {

  const { comments } = useCommunityStore((state) => ({
    comments: state.comments,
  }));

  const user = useUserStore((state)=>state.user)
  const context = React.useContext(commentContext);

  const [showChildren, setShowChildren] = React.useState(false);

  return (
    <>
      <article className="p-6 my-1 text-base rounded-lg min-w-[200px]" >
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold gap-x-3">
              <UserAvatar img={comments[comment._id]?.author.photoURL || '/home/image.png'} name={comments[comment._id]?.author.name} />
              {comments[comment._id]?.author.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">              
                {comments[comment._id]?.author.updatedAt}
            </p>
          </div>

        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {comments[comment._id]?.body}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
          onClick={()=>context.setReply(comment._id)}
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
          >
            Reply
          </button>
          
          {
                user?.uid == comments[comment._id].author.uid &&
                <button
                type="button"
                onClick={()=>context.setEdit(comment._id)}
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
            >
                Edit
            </button>
          }
          {/* {
                user?.uid == comments[comment._id].author.uid &&
                <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
            >
                Delete
            </button>
          } */}
          {comment?.children?.length>0 && <button
            onClick={() => setShowChildren(!showChildren)}
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
          >
            view replies ({comment.children.length})
          </button>}
        </div>
        {
            showChildren &&
            comment.children.map((child) => (
                <Comment key={child.id} comment={child} />
            ))
        }
      </article>
    </>
  );
};



const EditComment = () => {
  const { comments,editPostComment } = useCommunityStore((state) => ({
    comments: state.comments,
    editPostComment: state.editPostComment
  }));

  const {toast} = useToast()

  const context = React.useContext(commentContext);

  const [value, setValue] = React.useState(comments[context.edit].body);
  const [loading, setLoading] = React.useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const res = await editPostComment(context.edit, value);
    console.log(res)
    if(res.data.success){
      context.setEdit(null)
      toast({
        title:"Comment Edited"
      })
      setLoading(false)
    }
    else{
      toast({
        title:"Something went wrong",
        variant:"destructive"
      })
      setLoading(false)
    }
  }

  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  }, [context.edit]);


  return (
    <div className="flex items-center gap-x-2  w-full">
      <Textarea ref={inputRef} value={value} onChange={(e)=>setValue(e.target.value)} />
      <Button onClick={()=>context.setEdit(null)} variant="outline" className="rounded-full">Cancel</Button>
      <Button onClick={handleEdit} loading={loading} className="rounded-full" >Edit</Button>
    </div>
  )
}

const ReplyComment = ({postId}) => {
  const { commentOnPost } = useCommunityStore((state) => ({
    commentOnPost: state.commentOnPost
  }));

  const {toast} = useToast()

  const context = React.useContext(commentContext);

  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleReply = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const res = await commentOnPost(postId,context.reply, value);
    console.log(res)
    if(res.data.success){
      context.setReply(null)
      toast({
        title:"Reply Added"
      })
      setLoading(false)
    }
    else{
      toast({
        title:"Something went wrong",
        variant:"destructive"
      })
      setLoading(false)
    }
  }

  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  }, [context.reply]);

  return (
    <div className="flex items-center gap-x-2  w-full">
      <Textarea ref={inputRef} value={value} onChange={(e)=>setValue(e.target.value)} />
      <Button onClick={()=>context.setReply(null)} variant="outline" className="rounded-full">Cancel</Button>
      <Button onClick={handleReply} loading={loading} className="rounded-full" >Reply</Button>
    </div>
  )
}

const AddComment = ({postId}) => {
  const { commentOnPost } = useCommunityStore((state) => ({
    commentOnPost: state.commentOnPost
  }));

  const {toast} = useToast()

  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const res = await commentOnPost(postId,null, value);
    if(res.data.success){
      toast({
        title:"Comment Added"
      })
      setLoading(false)
    }
    else{
      toast({
        title:"Something went wrong",
        variant:"destructive"
      })
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2  w-full">
      <Input className="border-t-transparent border-x-transparent" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="add a comment" />
      <Button onClick={handleComment} loading={loading} className="rounded-full" >Comment</Button>
    </div>
  )
}
