import admin from "@/lib/firebase_admin";
import { Description } from "@radix-ui/react-toast";
import { decode } from 'jsonwebtoken'
import { NextResponse } from "next/server";


const quizToPlan = {
    'Free':'BASIC',
    'Standard':'STANDARD',
    'Premium':'PREMIUM',
    'Pro':'PRO'
}
const plan = ['ALL','BASIC','STANDARD','PREMIUM','PRO']
const hyOptions = ['Standard','Premium','Pro']
const plansSection = {
    'pgneet':'PGNEET',
    'fmge':'FMGE'
}
const collections = {
    'pgneet':"PGupload",
    'fmge':'Fmge'
}
const categories = {
    'swt':"Weekley",
    'cwt':'CWT',
    'gt':'Weekley'
}

// {
//     FMGE: {
//     Duration: '6',
//     Plan: 'PREMIUM',
//     starting: '2024-10-01T17:18:47.779Z'        
//   },
//     PGNEET: {
//     Duration: '6',
//     Plan: 'STANDARD',
//     starting: '2024-10-01T18:37:14.240Z'        
//   }


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
        if(quiz.type!='Free' &&( subscription==null || Object.keys(subscription).includes(plansSection[section])==-1 || plan.indexOf(subscription[plansSection[section]])<plan.indexOf(quizToPlan[quiz.hyOption]))){
            return new NextResponse(JSON.stringify({message:"Upgrade Plan",success:false,code:2}))
        }
        let planStartingDate = new Date(subscription[plansSection[section]].starting)
        planStartingDate.setMonth(planStartingDate.getMonth() + parseInt(subscription[plansSection[section]].Duration))
        let dateNow = new Date()
        if(planStartingDate < dateNow){
            return new NextResponse(JSON.stringify({message:"Plan Expired",success:false,code:3}))
        }
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
