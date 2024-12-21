import Razorpay from "razorpay";
import {
    validatePaymentVerification,
    validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils";
import { FRONTEND_HOST } from "@/app/constants";
import admin from "@/lib/firebase_admin";

export async function POST(req, res) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            await req.json();

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return Response.redirect(`${FRONTEND_HOST}/checkout/failure`);
        }

        const result = await validatePaymentVerification(
            {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
            },
            razorpay_signature,
            process.env.RAZORPAY_KEY_SECRET
        );

        if (!result)
            return new Response(
                JSON.stringify({ success: false, message: "Something went wrong!" })
            );

        return activatePlan(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );
    } catch (error) {
        //console.log(error);
        return new Response(
            JSON.stringify({ success: false, message: "Something went wrong!" })
        );
    }
}

export const activatePlan = async (
    razorpay_order_id,
    razorpay_payment_id = "",
    razorpay_signature = ""
) => {
    const db = await admin.firestore();
    const orderDoc = await db
        .collection("PlansOrders")
        .doc(razorpay_order_id)
        .get();
    const order = orderDoc.data();
    const date = new Date();
    const subscription = {
        Duration: order.plan.duration,
        Plan: order.plan.planID.split("-")[1].toUpperCase(),
        starting: date.toISOString(),
    };

    if (order?.couponUsed) {
        let coupon = order.plan.coupon;
        await db.collection("CouponUsedInPlans").add({
            coupon: coupon.couponCode,
            planID: order.plan.planID,
            user: order.user,
            usedAt: date.toISOString(),
            amount: order.amount / 100,
            discount: coupon.discount,
            generatedBy: coupon.generatedBy,
            orderId: razorpay_order_id,
        });
    }

    const updateOrderDoc = await db
        .collection("PlansOrders")
        .doc(razorpay_order_id)
        .update({
            status: "success",
            razorpay_payment_id,
            razorpay_signature,
        });

    const userInSubscription = await db
        .collection("SubscribedUsers")
        .doc(order.user)
        .get();
    if (!userInSubscription.exists) {
        await db
            .collection("SubscribedUsers")
            .doc(order.user)
            .set({
                [order.plan.section]: subscription,
            });
        return new Response(
            JSON.stringify({ success: true, message: "Plan activated!" })
        );
    }

    const subscriptionDoc = await db
        .collection("SubscribedUsers")
        .doc(order.user)
        .update({
            [order.plan.section]: subscription,
        });

    return new Response(
        JSON.stringify({ success: true, message: "Plan activated!" })
    );
};
