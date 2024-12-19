"use client";
import { FaGear } from "react-icons/fa6";
import { Book, Star } from 'lucide-react'

export const OverviewSkeleton = () => {
    return (
        <div className="w-full">
            <div className="w-full p-4">
                <div className="flex w-full items-center justify-between border-b-2 border-gray-300 pb-2">
                    <h3 className="font-medium text-sm">Overview</h3>
                    <button>
                        <FaGear />
                    </button>
                </div>
            </div>
            <div className="w-full relative">
                <div className="w-full h-56 bg-gray-300 rounded-lg animate-pulse"></div>
                {/* <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">Free</p> */}
            </div>
            <div className="w-full p-4">
                <h3 className="font-medium text-lg">Loading...</h3>
                <p className="text-sm">Loading...</p>
                <div className="mt-2 flex gap-x-3 items-center">
                    <div className="flex space-x-2 items-center">
                        <Star className="size-5 text-yellow-400" />
                        <p>
                            Ratings : Loading... (Loading...)
                        </p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Book className="size-5 text-indigo-600" />
                        <p>Subject : Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}