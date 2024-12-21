import admin from "@/lib/firebase_admin";
import Razorpay from "razorpay";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
    try {
        var instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const body = await req.json();
        const db = admin.firestore();

        const userSnap = await db
            .collection("users")
            .where("Phone Number", "==", body.phone)
            .get();
        if (userSnap.empty) {
            return new Response(
                JSON.stringify({ status: "error", message: "user not found" })
            );
        }
        const user = userSnap.docs[0].data();

        const courseDoc = await db
            .collection("Exclusive_Course")
            .doc(body.courseId)
            .get();

        const course = courseDoc.data();
        let price = course.price[body.duration] || 0;

        if (price <= 0)
            return new Response(
                JSON.stringify({ success: false, message: "Invalid duration" })
            );

        var options = {
            amount: price * 100,
            currency: "INR",
            notes: {
                for: "exclusive",
            },
        };
        const order = await instance.orders.create(options)
        await db.collection('PlansOrders').doc(order.id).set({
            order_id: order.id,
            plan: {...body},
            user: user["Phone Number"],
            status: "pending",
            amount: price*100,
            currency: "INR",
            razorpay_payment_id: null,
            razorpay_signature: null,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return new Response(JSON.stringify({status:"success",order_id:order.id}));
    } catch (e) {
        //console.log(e)
        return new Response(JSON.stringify({"success":false,message:"Something went wrong!"}))
    }
}
