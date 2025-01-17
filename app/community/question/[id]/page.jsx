"use client";
import React, { useEffect } from "react";
import { useCommunityStore } from "@/store/useCommunityStore";
import { QuestionCard } from "../../components/question_card";
import LoadingScreen from "@/components/ui/loading-screen";

const QestionDetailPage = ({ params }) => {
  const id = params.id.split("-").pop();
  const { questions, posts, fetchQuestionById } = useCommunityStore(
    (state) => ({
      questions: state.questions,
      posts: state.posts,
      fetchQuestionById: state.fetchQuestionById,
    })
  );

  useEffect(() => {
    fetchQuestionById(id);
  }, [fetchQuestionById, id]);

  return (
    <div className="w-full max-w-2xl mx-auto h-full min-h-screen pt-3 px-2">
      {questions[id]?.data && <QuestionCard question={questions[id]?.data} />}
      <div className="w-full border-b-2 border-gray-300 dark:border-gray-700 my-5" />
      {questions[id]?.data?.relatedPosts == null && <LoadingScreen />}
      {questions[id]?.data?.relatedPosts &&
        questions[id]?.data?.relatedPosts.map((postId) => (
          <div key={postId} className="mt-3">
            {posts[postId] && <PostCard postId={postId} />}
          </div>
        ))}
    </div>
  );
};

export default QestionDetailPage;

import LikeButton from "../../components/like_button/like_button";

import { MdOutlineModeComment } from "react-icons/md";
import CommentsUI from "../../components/comments/comments";

const PostCard = ({ postId }) => {
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
    <div className="bg-white shadow-md rounded-md dark:bg-card/20 border border-border/20">
      <div className="flex items-center p-3">
        <img
          src={post.author.photoURL}
          alt={post.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2">
          <div className="font-semibold">{post.author.name}</div>
          <div className="text-xs text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
      </div>
      <div className="p-3">{post.body}</div>
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";

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
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comments[comment._id]?.author.photoURL}
                alt={comments[comment._id]?.author.name}
              />
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
