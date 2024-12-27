/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import admin from "@/lib/firebase_admin";
import { decodeToken } from "@/lib/getDecodedToken";
import { FaBook, FaStar } from "react-icons/fa6";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import SWGTQuizes from "../courses/[id]/swgt";
import CourseReviews from "./course-reviews";
import CourseBuy from "./course_buy";
import { CourseBuySheet } from "./course_buy_sheet";
import CourseOverviewHeader from "./course_overview_header";

const getCourseDetails = async (
    courseId
) => {
    return new Promise(async (resolve) => {
        await admin
            .firestore()
            .collection("Exclusive_Course")
            .doc(courseId)
            .get()
            .then((doc) => {
                if (!doc.exists) resolve({ error: "Course not found", data: null });
                const course = doc.data();
                resolve({ error: null, data: course });
            });
    });
};

const CourseOverview = async ({ id }) => {
    id = id.split("-").pop();
    const course = await getCourseDetails(id);
    if (course.error) return <div>{course.error}</div>;

    return (
        <div className="w-full flex justify-center pt-4 gap-4 relative ">
            <div className="flex flex-col w-full p-4 md:p-0 md:w-3/5 ">
                
                <CourseOverviewHeader 
                    title={course.data?.title} 
                    cover={course.data?.cover} 
                    rated_by={course?.data?.rated_by} 
                    rating_avg={course?.data?.rating_avg}
                    subject={course?.data?.subject}
                    description={course?.data?.description}
                />
                <div className="bg-neutral-100 p-4 mt-4 rounded-lg border border-neutral-200 md:shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
                    <h1 className="font-medium text-base">About this course</h1>
                    <p className="mt-3 text-slate-700" dangerouslySetInnerHTML={{__html:course.data?.about}}></p>
                </div>
                {
                    course.data?.advantages &&
                    <div className='w-full bg-slate-100 p-4 mt-4 rounded-lg border border-neutral-50'>
                        <h1 className="font-medium text-base">What You'll get</h1>
                        <div className="flex flex-col gap-4 mt-4">
                            {
                                course.data?.advantages?.map((advantage, index) => (
                                    <div key={index} className="w-full flex items-center gap-x-3 text-slate-700">
                                        <span className="p-1 bg-green-400 rounded-full text-white"><Check size={16} /></span>
                                        <span>{advantage}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                <SWGTQuizes id={id} />
                
                <CourseReviews courseId={id} />
            </div>
            {
                course.data?.price ?
                <div className="w-full md:max-w-sm h-fit max-md:fixed bottom-0 left-0">
                    <CourseBuySheet title={course?.data?.title} cover={course.data?.cover} courseId={id} m6={course.data.price[6]} m12={course.data.price[12]} m18={course.data.price[18]} />
                </div>
                : <FreeCourse />
            }
        </div>

    );
};

export default CourseOverview;

const FreeCourse = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="font-semibold text-lg">This course is free</h1>
        </div>
    );
}