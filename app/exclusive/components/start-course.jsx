"use client"
import { ImageUpload } from "@/components/image-uploader"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {
    ToggleGroup,
    ToggleGroupItem,
    } from "@/components/ui/toggle-group"
import { Course } from "@/types/courses"
import { useUserStore } from "@/store/userStore"
import { updateCourse } from "@/app/actions"
import { useRouter } from "next/navigation"
import {  PencilIcon } from "lucide-react"



export default function StartCourse({coursetoedit,type}) {
    const user = useUserStore((state) => state.user)
    const router = useRouter()

    const [course, setCourse] = useState<Course>(
        coursetoedit || 
        {
            name: user?.displayName || "",
            description: "",
            cover: "",
            premium_status:false,
            price:{
                "6":0,
                "12":0,
                "18":0
            },
            id: crypto.randomUUID(),
            instructorId: user?.registration.DocID || "",
            lang: "en",
            last_updated: { _seconds: 0, _nanoseconds: 0 },
            rated_by: 0,
            subject: user?.registration.Interest || "",
            title: "",
        }
    )

    const handleSubmit = async () => {
        const res = await updateCourse(course.id, course)
        if (res.success) {
            alert("Success")
            router.refresh()
        } else {
            alert("Failed")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size={type}>{type=="icon"?<PencilIcon/>:<>{coursetoedit?"Edit":"Start"} Course</>}</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg w-full max-h-[calc(100vh-18px)] overflow-auto my-auto">
                <DialogHeader>
                    <DialogTitle>Start New Course</DialogTitle>
                    <DialogDescription>
                        Start a new course. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="name" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="name"
                            value={course.title}
                            onChange={(e) =>
                                setCourse({ ...course, title: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="name" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="name"
                            value={course.description}
                            onChange={(e) =>
                                setCourse({ ...course, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="name" className="text-right">
                            Cover Image
                        </Label>
                        <ImageUpload imageUrl={course.cover} onImageChange={(val)=>setCourse({...course,cover:val})}/>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="name" className="text-right">
                            Type
                        </Label>
                        <FreePaidToggle value={course.premium_status} onChange={(val)=>setCourse({...course,premium_status:val})}/>
                    </div>
                    {   
                        course.premium_status  &&
                        <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="name" className="text-right">
                                6 Months Price
                            </Label>
                            <Input type="number" value={course.price[6]} onChange={(e)=>setCourse({...course,price:{...course.price,"6":Number(e.target.value)}})}/>
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="name" className="text-right">
                                12 Months Price
                            </Label>
                            <Input value={course.price[12]}  onChange={(e)=>setCourse({...course,price:{...course.price,"12":Number(e.target.value)}})}/>
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="name" className="text-right">
                                18 Months Price
                            </Label>
                            <Input value={course.price[18]}  onChange={(e)=>setCourse({...course,price:{...course.price,"18":Number(e.target.value)}})}/>
                        </div>

                    </div>}
                    
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



export function FreePaidToggle({value, onChange}) {
    return (
        <ToggleGroup type="single" className="w-fit" value={value?"true":"false"} onValueChange={(val)=>onChange(val=="true"?true:false)}>
            <ToggleGroupItem value="false" aria-label="Toggle free">
                <p>Free</p>
            </ToggleGroupItem>
            <ToggleGroupItem value="true" aria-label="Toggle paid">
                <p>Paid</p>
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
