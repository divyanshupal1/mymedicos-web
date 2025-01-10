import {decode,JwtPayload, verify} from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'


export const decodeToken = () => {
    const token = cookies().get('authtoken')?.value
    const verification = verify(token,process.env.SECRET)
    if(!verification) permanentRedirect('/login')
    if(!token) return {error:"Unauthorized",token:null}
    const decoded = decode(token)
    return {error:null,token:decoded}
}