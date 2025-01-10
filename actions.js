"use server"

import { decodeToken } from "./lib/getDecodedToken"
import admin from "./lib/firebase_admin"

export const getLoggedInUser = async () => {
    const {token,error} = decodeToken()
    if(error || !token) return {error:"Invalid Token",code:401,success:false}

    const uid = token.phoneNumber
    try{
        const user = await admin.firestore().collection('users').where('Phone Number','==',uid).get()
        const userDoc = user.docs[0]
        return {data:userDoc.data(),code:200,success:true}
    }
    catch(e){
        return {error:e.message,code:500,success:false}
    }
}

export const saveProgress = async (course,quiz,type,progress) => {
    const {token,error} = decodeToken()
    if(error || !token) return {error:"Invalid Token",code:401,success:false}

    const uid = token.phoneNumber
    try{
        await admin.firestore()
        .collection('QuizProgress')
        .doc(uid)
        .collection('Exclusive')
        .doc(course)
        .collection(type)
        .doc(quiz).update({progress}).then(()=>{
            return {success:true,code:200}
        })

        return {success:true,code:200}
    }
    catch(e){
        return {error:e.message,code:500,success:false}
    }
}

export const submitQuiz = async (course,quiz,type,submissions) => {
    const {token,error} = decodeToken()
    if(error || !token) return {error:"Invalid Token",code:401,success:false}

    const uid = token.phoneNumber

    try{
        await admin.firestore()
        .collection('QuizProgress')
        .doc(uid)
        .collection('Exclusive')
        .doc(course)
        .collection(type)
        .doc(quiz).set({progress:{},submissions}).then(()=>{
            return {success:true,code:200}
        })

        return {success:true,code:200}
    }
    catch(e){
        return {error:e.message,code:500,success:false}
    }
}

export const getSubmissions = async (course,quiz,type) => {
    const {token,error} = decodeToken()
    if(error || !token) return {error:"Invalid Token",code:401,success:false}

    const uid = token.phoneNumber
    try{
        return new Promise((resolve,reject)=>{
            admin.firestore()
            .collection('QuizProgress')
            .doc(uid)
            .collection('Exclusive')
            .doc(course)
            .collection(type)
            .doc(quiz).get().then((data)=>{
                resolve({success:true,code:200,data:data.data()})
            })
        })
    }
    catch(e){
        return {error:e.message,code:500,success:false}
    }
}