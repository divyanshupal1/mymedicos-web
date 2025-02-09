import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import admin from "@/lib/firebase_admin";
export async function POST(req) {

    const body = await req.json();
    try {
        const {uid } = body.user;
        const {accessToken} = body.user.stsTokenManager;
        return new Promise((resolve, reject) => {
            admin.auth().verifyIdToken(accessToken).then(async(userRecord) => {
                if(userRecord.uid !== uid) {
                    reject("User not found");
                }
                const {token,subscription,doc} = await generateToken(userRecord);
                const response = new NextResponse(JSON.stringify({message:"authorized",success:true,subscription,doc}),{status:200});
                response.cookies.set("authtoken", token)
                resolve(response);
            }).catch((error) => {
                console.log("Error fetching user data:", error);
                reject(JSON.stringify({message:"unauthorized",success:false}));
            });
        });   
    } catch (error) {
        console.log(error);
        return new NextResponse().json({message:"unauthorized",success:false})      
    }
}

const generateToken = async (user) => {
    const {email,phone_number,uid} = user;
    const tokenData = {
        email,
        phoneNumber:phone_number,
        uid,
    }
    if(phone_number){
        await admin.firestore().collection('SubscribedUsers').doc(phone_number).get().then((doc)=>{
            if(doc.exists) {
                tokenData.subscription = doc.data();
            }
            else{
                tokenData.subscription = null;
            }
        })
        await admin.firestore().collection('users').where("Phone Number","==",phone_number).get().then(doc=>{
            tokenData.doc = doc.docs[0]?.data() || null
        })
    }
    
    const token = sign(tokenData, process.env.SECRET, {
        expiresIn: "1d",
    });
    return {token,subscription:tokenData.subscription,doc:tokenData.doc};
}