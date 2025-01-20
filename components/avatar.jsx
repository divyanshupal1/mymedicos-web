import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const UserAvatar = ({ img, name, className }) => {
    return (
        <Avatar className={"w-9 h-9 " + className}>
            <AvatarImage src={img} />
            <AvatarFallback>{name?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar