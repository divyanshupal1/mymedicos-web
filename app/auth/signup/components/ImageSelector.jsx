/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview.jsx'
import { useDebounceEffect } from './useDebounceEffect.jsx'

import 'react-image-crop/dist/ReactCrop.css'
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog.jsx'
import { UploadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { storage } from '@/lib/firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useUserStore } from '@/store/userStore.jsx'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useToast } from '@/components/ui/use-toast.js'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'



function centerAspectCrop(
    mediaWidth,
    mediaHeight,
    aspect,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function ImageSelect({setUrl}) {
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const hiddenAnchorRef = useRef(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(1)

    const [cropped, setCropped] = useState(false)
    const [type, setType] = useState("")

    const [loading,setLoading]=useState(false)
    const {toast}=useToast()
    

    const user = useUserStore(state => state.user)

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined)
            setCropped(false)
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
            let t = e.target.files[0].name.split('.').pop()
            setType(t)
        }
    }

    function onImageLoad(e) {

        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    async function onDownloadCropClick() {
        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist')
        }

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
        )
        const ctx = offscreen.getContext('2d')
        if (!ctx) {
            throw new Error('No 2d context')
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        )

        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        })

        if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current)
        }
        blobUrlRef.current = URL.createObjectURL(blob)
        uploadImage(blob)

        if (hiddenAnchorRef.current) {
            hiddenAnchorRef.current.href = blobUrlRef.current
            hiddenAnchorRef.current.click()
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    const uploadImage = (file) => {
        setLoading(true)
        const storageRef = ref(storage, `users/${user.phoneNumber}/profile.${type}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {},
            (error) =>{
                setCompletedCrop(null)
                setLoading(false)
                toast({
                    title:"Cannot upload profile image",
                    variant:"destructive"
                })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL)
                    setLoading(false)
                });
            }
        );

    }


    return (
        <>

            <div className='relative w-full flex items-center justify-center max-w-[150px] mx-auto aspect-square rounded-full border-dashed border-[2px] border-spacing-2 border-neutral-700 overflow-hidden cursor-pointer'>
                {!loading && <UploadIcon className='-z-20' />}
                {
                    loading && 
                    <div className='w-full h-full z-50 absolute top-0 left-0 flex items-center justify-center bg-neutral-50/50'>
                        <div className='animate-spin'>
                            <span className='scale-150'><AiOutlineLoading3Quarters/></span>
                        </div>
                    </div>
                }
                <input className="w-full h-full cursor-pointer absolute top-0 left-0 z-10 opacity-0" type="file" accept="image/*" onChange={onSelectFile} />
                {!!completedCrop &&
                    <canvas
                        ref={previewCanvasRef}
                        className='w-full h-full object-contain absolute top-0 left-0 -z-10'
                    />
                }
            </div>


            <Dialog open={!!imgSrc && !cropped}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select profile image</DialogTitle>
                        <DialogDescription>User profile image</DialogDescription>
                    </DialogHeader>
                    {
                        !!imgSrc && (
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={1}
                                minHeight={100}

                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        )
                    }
                    <Button onClick={() => {
                        setCropped(true)
                        onDownloadCropClick()
                    
                    }}>done</Button>
                </DialogContent>
            </Dialog>
        </>
    )
}
