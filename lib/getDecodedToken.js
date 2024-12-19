import {decode,JwtPayload} from 'jsonwebtoken'
import { cookies } from 'next/headers'


export const decodeToken = () => {
    const token = cookies().get('authtoken')?.value
    if(!token) return {error:"Unauthorized",token:null}
    const decoded = decode(token)
    return {error:null,token:decoded}
}