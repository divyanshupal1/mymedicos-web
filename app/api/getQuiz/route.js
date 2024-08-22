import admin from "@/lib/firebase_admin";
import { Description } from "@radix-ui/react-toast";
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
    'cwt':'CWT',
    'gt':'Weekley'
}


export async function GET(req, res) {
    const token = req.cookies.get('authtoken').value
    let {subscription,uid} = decode(token)    

    const searchParams = req.nextUrl.searchParams
    const section = searchParams.get('section')
    const category = searchParams.get('category')
    const id = searchParams.get('id')

    if(section==null||category==null || id==null){
        return new NextResponse(JSON.stringify({message:"invalid reuest",success:false,code:401}))
    }

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
        if(category=='gt'){
            quiz.Data = quiz.Data.map(data=>({...data,Correct:null,Description:null}))
            const progressDoc = await admin.firestore().collection('QuizProgress').doc(uid).collection('GT').doc(quiz.qid).get()
            if(progressDoc.exists){
                let deadline = new Date(progressDoc.data().deadline)
                let dateNow = new Date()
                if(progressDoc.data().submitted ||deadline < dateNow ){
                    admin.firestore().collection('QuizProgress').doc(uid).collection('GT').doc(quiz.qid).update({submitted:true})
                    return new NextResponse(JSON.stringify({success:false,"message":"Already Attempted",code:1}))
                }
                quiz.progressData = progressDoc.data()

            }
            else{
                let defaultProgress = {
                    progress:{},
                    review:[],
                    deadline:new Date(Date.now() + 210*60*1000).toISOString(),
                    submitted:false,
                    started:true,
                    section:section,
                    quiz:{...quiz,Data:null}
                }
                quiz.progressData = defaultProgress

                admin.firestore().collection('QuizProgress').doc(uid).collection('GT').doc(quiz.qid).set(defaultProgress)
            }
        }

        if(quiz.type=='Free'){
            return new NextResponse(JSON.stringify({success:true,data:quiz,message:"Free Quiz"}))
        }

        if(subscription.Field.includes(plans[section])==-1){
            return new NextResponse(JSON.stringify({message:"Not Subscribed for PGNEET",success:false,code:2}))
        }

        if(hyOptions.indexOf(subscription.hyOption)<hyOptions.indexOf(quiz.hyOption)){
            return new Response(JSON.stringify({message:"upgrade plan to access the quiz",success:false,code:3}))
        }

        return new NextResponse(JSON.stringify({success:true,data:quiz,message:"Quiz fetched"}))
        

    }
    catch(err){
        //console.log(err)
        return new NextResponse(JSON.stringify({message:"Something wrong"}))
    }
}

//codes
//1 - Already Attempted
//2 - Not Subscribed for PGNEET
//3 - Upgrade Plan
//4 - Something wrong
