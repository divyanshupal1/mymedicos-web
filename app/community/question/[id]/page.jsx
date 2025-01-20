"use client";
import React, { useEffect } from "react";
import { useCommunityStore } from "@/store/useCommunityStore";
import { QuestionCard } from "../../components/question_card";
import LoadingScreen from "@/components/ui/loading-screen";
import { PostCard } from "../../components/post_card";
import { PostDialog } from "../../components/header/post_dialog";

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
      {
        questions[id]?.data && 
        <>
          <QuestionCard question={questions[id]?.data} />
          <div className="font-medium w-full px-5 mt-5 flex items-center justify-between">
            <span>Answers</span>
            <div className="max-w-[190px]">
              <PostDialog questionId={id} button_text="Add Answer" dialogTitle={"Add a answer"} />
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-300 dark:border-gray-700 mb-5 mt-2" />
        </>
      }
      {
        questions[id]?.data?.relatedPosts == null && <LoadingScreen />
      }
      {
        questions[id]?.data?.relatedPosts &&
          questions[id]?.data?.relatedPosts.map((postId) => (
            <div key={postId} className="mt-3  ">
              {posts[postId] && <PostCard postId={postId} />}
            </div>
          ))
      }
    </div>
  );
};

export default QestionDetailPage;


