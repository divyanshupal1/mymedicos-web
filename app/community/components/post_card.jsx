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
      {/* {
                showComments &&
                <div className=''>
                    <div className='border-y-2 border-gray-300 dark:border-gray-800 p-2 px-3 my-3'>Comments</div>
                    <CommentsUI />
                </div>
            } */}
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

const CommentsDrawer = ({ postId, open, close }) => {
  const { getPostComments, postComments } = useCommunityStore((state) => ({
    getPostComments: state.getPostComments,
    postComments: state.postComments,
  }));

  useEffect(() => {
    if (
      open &&
      !postComments?.[postId]?.loaded &&
      !postComments?.[postId]?.loading &&
      postComments?.[postId]?.data == null
    ) {
      getPostComments(postId);
    }
  }, [postComments, open, postId]);

  return (

    <Drawer open={open} onClose={close} className="md:hidden">
      <DrawerContent className="max-w-3xl mx-auto ">
        <DrawerHeader>
          <DrawerTitle>Comments</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        {postComments[postId] && postComments[postId].loading && (
          <LoadingScreen />
        )}
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto  w-full px-3">
        {postComments?.[postId]?.data?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Comment = ({ comment }) => {
  const { comments } = useCommunityStore((state) => ({
    comments: state.comments,
  }));
  const user = useUserStore((state)=>state.user)

  const [showChildren, setShowChildren] = React.useState(false);

  return (
    <>
      <article className="p-6 my-1 text-base rounded-lg min-w-[200px]" >
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
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
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
          >
            Reply
          </button>
          
          {
                user?.uid == comments[comment._id].author.uid &&
                <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
            >
                Edit
            </button>
          }
          {
                user?.uid == comments[comment._id].author.uid &&
                <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium gap-x-2"
            >
                Delete
            </button>
          }
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
