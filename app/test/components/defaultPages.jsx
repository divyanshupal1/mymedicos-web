import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const AlreadySumbitted = ({url}) => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <p className='font-semibold mb-4 text-xl'>Quiz Already Completed</p>
            <Link href={"/"+url} className={buttonVariants({variant:"default"})}>Go Back</Link>
        </div>
    )
}

export const UpgradePlan = ({url}) => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <p className='font-semibold mb-4 text-xl'>Upgrade Plan to access the quiz</p>
            {url && <Link href={"/"+url} className={buttonVariants({variant:"default"})}>Go Back</Link>}
        </div>
    )
}