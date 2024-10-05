import { activatePlan } from "../callback/route";

const orderCollections = {
    plans : "PlansOrders"
}

export async function POST(req){
    const body = await req.json();
    const data = body?.payload?.payment?.entity

    if(data?.captured){
        let type = data.notes.for; // plans

        if(type=="plans"){
            return activatePlan(data.order_id);
        }


    }

    return new Response("succeess")
}