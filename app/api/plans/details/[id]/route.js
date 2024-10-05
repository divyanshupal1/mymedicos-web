import admin from "@/lib/firebase_admin";

export const dynamic = "force-dynamic";

export async function GET(req,{params}){
    try{
        const razorpay_order_id = params.id;
        const db  = admin.firestore();
        const orderDoc = await db.collection("PlansOrders").doc(razorpay_order_id).get();
        if(!orderDoc.exists) return new Response(JSON.stringify({success:false,message:"Order not found"}));
        const {amount,plan,user,currency,status} = orderDoc.data();
        return new Response(JSON.stringify({
            currency,
            amount,
            plan,
            user,
            success:true,
            order_id:razorpay_order_id,
            status
        }));
    }catch(e){
        console.log(e);
        return new Response(JSON.stringify({success:false,message:"Something went wrong!"}));
    }
}