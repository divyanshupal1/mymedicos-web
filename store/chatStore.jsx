import { create } from "zustand";
import { db } from "@/lib/firebase";
import { addDoc,onSnapshot,query,where, arrayRemove,updateDoc, collection, doc, getDoc, getDocs, arrayUnion, serverTimestamp, orderBy } from "firebase/firestore";




export const useChatStore = create((set) => ({
    messages : {},
    chats:{},
    activeChatId : null,
    dataloaded:false,
    loadChatData : async (user) => {
        if(!user) return;
        try{
            onSnapshot(doc(db, "MentorChats",user.phoneNumber), (doc) => {
                set((state) => ({chats:doc.data(),dataloaded:true}));
            });
            return true;
        }catch(e){
            //console.log(e);
            return false;
        }
    },
    setActiveChatId : async (user,id) => {
        if(!id) return;
        try{
            const updateNew = doc(db, "MentorChats",user.phoneNumber);
            await updateDoc(updateNew, { new: arrayRemove(id) });
            set((state) => ({activeChatId:id}));
            return true;
        }
        catch(e){
            //console.log(e);
            return false;
        }
    },
    sendMessage : async (user,chatId,message) => {
        if(!message || !chatId || !user) return;
        const newMessage = {
            sender:"user",
            message:message,
            time:serverTimestamp()
        }
        try{
            const res = await addDoc(collection(db, "MentorChats",user.phoneNumber,chatId), newMessage);
            let mentor = undefined;
            set((state) => {
                mentor = state.chats.all.find((chat) => chat.id === chatId).mentor;
                return state;
            });
            const updateNew = doc(db, "MentorAcceptedChats",mentor.id);
            await updateDoc(updateNew, { new: arrayUnion(chatId) });
            return true;
        }
        catch(e){
            //console.log(e);
            return false;
        }
        
    },
    subscribeToChat : (user,chatId) => {
        if(!user || !chatId) return;
        set((state) => ({messages:{...state.messages,[chatId]:[]}}));
        const q = query(collection(db, "MentorChats",user.phoneNumber,chatId),orderBy("time","asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            // const messagesSorted = messages.sort((a,b) => a.time - b.time);
            set((state) => ({messages:{...state.messages,[chatId]:[...messages]}}));
        });
        return unsubscribe;
    }
}));