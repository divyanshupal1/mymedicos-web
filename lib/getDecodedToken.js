import {decode,JwtPayload, verify} from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'


export const decodeToken = async () => {
    const cookie = await cookies()
    const token = cookie.get('authtoken')?.value
    const verification = verify(token,process.env.SECRET)
    console.log(verification)
    if(!verification) permanentRedirect('/auth/login')
    if(!token) return {error:"Unauthorized",token:null}
    const decoded = decode(token)
    return {error:null,token:decoded}
}