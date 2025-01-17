/* eslint-disable @next/next/no-img-element */
"use client"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import CourseBuy from "./course_buy"

  
export function CourseBuySheet({m6, m12, m18 ,courseId,cover,title}) {
    return (
        <>
            <div className="hidden md:block w-full max-w-md p-4 bg-green-50 dark:bg-slate-900 rounded-lg border mt-6"> 
                
                {
                    cover && 
                     <img
                        src={cover}
                        alt={title}
                        className="w-full h-56 object-cover rounded-lg"
                    />
                }
                <h1 className="font-semibold mt-5">Course Fee</h1>
                <CourseBuy m6={m6} m12={m12} m18={m18} courseId={courseId} />
            </div>
            <div className="md:hidden w-full">
                <Drawer>
                    <DrawerTrigger className="w-full">
                        <div className="w-full p-1 px-4 pb-3 bg-green-50 rounded-t-lg border flex items-center justify-between">
                            <div className="flex flex-col items-start gap-x-2">
                                <span className="font-medium text-lg">Rs. {m12}</span>
                                <span className="text-xs pl-2">( 12 Months )</span>
                            </div>
                            <Button >Buy Course</Button>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent className="px-4">
                        <DrawerHeader>
                            <DrawerTitle>Buy Course</DrawerTitle>
                            <DrawerDescription>Choose a plan to buy the course</DrawerDescription>
                        </DrawerHeader>
                        <CourseBuy m6={m6} m12={m12} m18={m18} courseId={courseId} />
                        <DrawerClose className="w-full my-3">
                            <Button variant="outline" className="w-full">Cancel</Button>
                        </DrawerClose>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}