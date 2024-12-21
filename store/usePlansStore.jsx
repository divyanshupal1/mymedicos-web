import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

const sections = {
    "FMGE": "FMGE",
    "PGNEET": "PG",
    "NEETSS": "NEET SS",
}

export const usePlansStore = create(
    persist(
        (set) => ({
            plans:{
                FMGE:null,
                PGNEET:null,
            },
            fetchPlans: async (section) => {
                if(!section) return false;
                try{
                    //console.log("fetching plans for",section)
                    const querySnapshot = await getDocs(collection(db, "Plans",sections[section],"Subscriptions"));
                    let plan = [];
                    querySnapshot.forEach((doc) => {
                        // //console.log(doc.data());
                        plan.push(doc.data());
                    });
                    set((state)=>({plans:{...state.plans,[section]:plan}}));
                    return true;
                }catch(e){
                    //console.log(e)
                    return false;
                }
                
            },
        }),
        {
            name: 'plans',
        }
    )
);