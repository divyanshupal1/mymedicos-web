/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge"
import { MessageCircleIcon } from "lucide-react";
import { MdOutlineModeComment } from "react-icons/md";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/avatar";

export const QuestionCard = ({ question }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/community/question/${question.title.replaceAll("?", "").replaceAll(" ", "-")}-${question._id}`)
  }
  return (   
    <div className="w-full relative px-4 pt-4 pb-1 cursor-pointer" onClick={handleClick}>
      {/* Author */}
      <AuthorTab author={question.author} createdAt={question.createdAt} />
      {/* Title */}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {question?.edited && <Badge variant={"outline"}>edited</Badge>}
        {question?.deleted && <Badge variant={"destructive"} >deleted</Badge>}
      </div >
      <div className="my-3 space-y-2 mb-5">
        <Link href={`/community/question/${question.title.replaceAll("?", "").replaceAll(" ", "-")}-${question._id}`} className="text-base font-semibold text-gray-800 dark:text-neutral-50 hover:underline">{question.title}</Link>
        <p className="text-gray-700 dark:text-neutral-100" dangerouslySetInnerHTML={{__html:question.body}}></p>
      </div>

      {/* Body */}

      {/* Tags */}
      <div className="">
        {/* <h3 className="text-gray-700 mb-2 dark:text-neutral-400 text-xs">Tags:</h3> */}
        <div className="flex gap-2 flex-wrap">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-secondary-foreground bg-secondary px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-3 items-center ">
        <div className='flex items-center p-0 h-fit bg-green-100/10 rounded-full px-4 py-2 gap-x-2'>
          <MdOutlineModeComment />
          <span className='text-sm'>{question.postCount} Answers</span>
        </div>
      </div>
    </div>
  );
};

const AuthorTab = ({ author, createdAt }) => {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar img={author?.photoURL} name={author?.name} />
      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{author.name}</p>
        <p className="text-gray-600 dark:text-gray-400 text-xs">{new Date(createdAt).toDateString()}</p>
      </div>
    </div>
  );
}


export const QuestionCardSkeleton = () => {
  return (
    <div className="w-full p-4 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-md bg-neutral-50 dark:bg-neutral-900">
      {/* Author */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-9 h-9 rounded-full" />
        <div>
          <Skeleton className="w-20 h-3 rounded-full"></Skeleton>
          <Skeleton className="w-16 h-2 rounded-full"></Skeleton>
        </div>
      </div>
      {/* Title */}
      <div className="my-3 space-y-2 mb-5">
        <Skeleton className="w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full"></Skeleton>
        <Skeleton className="w-36 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full"></Skeleton>
      </div>
      {/* Body */}
      {/* <Skeleton className="w-36 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full"></Skeleton> */}
      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton className="w-12 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full"></Skeleton>
        <Skeleton className="w-12 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full"></Skeleton>
      </div>
    </div>
  );
}