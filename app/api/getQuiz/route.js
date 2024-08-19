import admin from "@/lib/firebase_admin";
import { decode } from 'jsonwebtoken'
import { NextResponse } from "next/server";

const hyOptions = ['Standard','Premium','Pro']
const plans = {
    'pgneet':'PGNEET'
}
const collections = {
    'pgneet':"PGupload"
}
const categories = {
    'swt':"Weekley",
    'cwt':'CWT'
}


export async function GET(req, res) {
    const token = req.cookies.get('authtoken').value
    let {subscription} = decode(token)    

    const searchParams = req.nextUrl.searchParams
    const section = searchParams.get('section')
    const category = searchParams.get('category')
    const id = searchParams.get('id')

    let quiz =  {}
    try{
        await admin.firestore()
            .collection(collections[section])
            .doc(categories[category])
            .collection("Quiz")
            .doc(id).get()
            .then(doc => {
                quiz = doc.data()
            })
        
        if(quiz.type=='Free'){
            return new NextResponse(JSON.stringify({success:true,data:quiz}))
        }

        if(subscription.Field.includes(plans[section])==-1){
            return new NextResponse(JSON.stringify({message:"Not Subscribed for PGNEET",success:false}))
        }

        if(hyOptions.indexOf(subscription.hyOption)<hyOptions.indexOf(quiz.hyOption)){
            return new Response(JSON.stringify({message:"upgrade plan to access the quiz",success:false}))
        }

        return new NextResponse(JSON.stringify({success:true,data:quiz}))
        

    }
    catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message:"Something wrong"}))
    }
}