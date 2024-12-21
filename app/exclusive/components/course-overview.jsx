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

    const course = await getCourseDetails(id);
    if (course.error) return <div>{course.error}</div>;

    return (
        <div className="w-full flex pt-4 gap-4 relative">
            <div className="flex flex-col gap-4 w-full">
                <div className="w-full rounded-lg overflow-hidden shadow-md relative">
                    <img
                        src={course.data?.cover}
                        alt={course.data?.title}
                        className="w-full h-56 object-cover rounded-lg"
                    />
                    <p className="absolute top-0 z-10 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
                        {course.data?.premium_status ? "Premium" : "Free"}
                    </p>
                </div>
                <div className="w-full flex flex-col justify-end  drop-shadow-sm">
                    <h3 className="font-medium text-lg">{course.data?.title}</h3>
                    <div className="mt-2 flex gap-x-3 items-center ">
                        <div className="flex space-x-2 items-center">
                            <FaStar className="size-5 text-yellow-400" />
                            <p>
                                {course.data?.rating_avg} ({course.data?.rated_by})
                            </p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <FaBook className="size-5 text-blue-500" />
                            <p>{course.data?.subject}</p>
                        </div>
                    </div>
                </div>
                <p className="text-base pl-2 ">{course.data?.description}</p>
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
                <div className="min-w-[300px] md:hidden h-fit p-4 my-2 bg-green-50 rounded-lg shadow-md border sticky top-0">
                    <CourseBuy courseId={id} m6={course.data.price[6]} m12={course.data.price[12]} m18={course.data.price[18]} />
                </div>
                <CourseReviews courseId={id} />
            </div>
            <div className="min-w-[300px] max-md:hidden h-fit p-4 my-2 bg-green-50 rounded-lg shadow-md border sticky top-0">
                <CourseBuy courseId={id} m6={course.data.price[6]} m12={course.data.price[12]} m18={course.data.price[18]} />
            </div>
        </div>

    );
};

export default CourseOverview;
