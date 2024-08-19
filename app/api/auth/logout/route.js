import { NextResponse } from "next/server"

export default async function POST(req) {
    response.cookies.set("authtoken", "")
    return new NextResponse(JSON.stringify({message:"logged out",success:true}))
}