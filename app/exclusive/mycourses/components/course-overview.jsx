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
import SWGTQuizes from "../[id]/swgt";

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

const CourseOverview = async ({ params }) => {

    const course = await getCourseDetails(params.id.split("-").pop());
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
                    <div className="w-full h-full p-4 absolute flex flex-col justify-end bottom-0 bg-gradient-to-tr from-black/90 to-transparent drop-shadow-sm">
                        <h3 className="font-medium text-lg text-neutral-100 max-w-3xl truncate">{course.data?.title}</h3>
                        <p className="text-sm text-neutral-100 max-w-3xl truncate">{course.data?.description}</p>
                        <div className="mt-2 flex gap-x-3 items-center text-neutral-200">
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
                </div>
                <SWGTQuizes params={params} />
            </div>

        </div>

    );
};

export default CourseOverview;
