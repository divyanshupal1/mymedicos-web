import Razorpay from "razorpay";
import { validatePaymentVerification, validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { FRONTEND_HOST } from "@/app/constants";
import admin from "@/lib/firebase_admin";


export async function POST(req,res){
    try {
            const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = await req.json();
    
            if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature){
                return Response.redirect(`${FRONTEND_HOST}/checkout/failure`);
            }
    
            const result = validatePaymentVerification(
                {
                "order_id": razorpay_order_id, 
                "payment_id": razorpay_payment_id 
                }, 
                razorpay_signature, 
                process.env.RAZORPAY_KEY_SECRET
            );
    
            if(!result) return new Response(JSON.stringify({success:false,message:"Something went wrong!"}))
            
            const subscription = await subscribePlan(razorpay_order_id,razorpay_payment_id,razorpay_signature);
            return new Response(JSON.stringify(subscription));
    
        } catch (error) {
            //console.log(error);
            return new Response(JSON.stringify({success:false,message:"Something went wrong!"}))
        }
}


export const subscribePlan = async (razorpay_order_id,razorpay_payment_id="",razorpay_signature="") => {
    try {
        const db = admin.firestore();
        const orderDoc = await db.collection("PlansOrders").doc(razorpay_order_id).get();
        const order = orderDoc.data();
        const date = new Date();
        const starting = date.toISOString();
        date.setMonth(date.getMonth() + parseInt(order.plan.duration));


        await db.collection("PlansOrders").doc(razorpay_order_id).set({razorpay_payment_id,razorpay_signature,status:"success"},{merge:true});
        
        const subscriptionDoc = await db.collection("SubscribedUsers").doc(order.plan.phone).get();
        const subscriptionData = subscriptionDoc.data()?.Exclusive || {};
        const subscription = {
            Duration: order.plan.duration,
            starting: starting,
            ending: date.toISOString(),
        }

        subscriptionData[order.plan.courseId] = subscription;

        await db.collection("SubscribedUsers").doc(order.plan.phone).set({Exclusive:subscriptionData},{merge:true});
        return {success:true,message:"Plan activated successfully",subscription};
        
    } catch (error) {
        //console.log(error);
        return new Response(JSON.stringify({success:false,message:"Something went wrong!"}))
        
    }
}