import { create } from "zustand";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";




export const useChatStore = create((set) => ({
    messages : {
        "chatone":[
                {
                    id:"1",
                    sender:"user",
                    message:"Hello fsdhfs sdjofijsdio sfdoisdfj sdjofsidjf lorem ipsum dolor sit amet lorem fsjlk fsdjf s fosidfjois fsodjifis dfosijdfoisjdf sodifjiosjdf iosd fdsjopfiosdjfoi sfjodsijfios dfjsdoifj siod"
                },
                {
                    id:"2",
                    sender:"mentor",
                    message:"Hi"
                },
                {
                    id:"3",
                    sender:"user",
                    message:"How are mentor?"
                },
                {
                    id:"4",
                    sender:"mentor",
                    message:"I am fine"
                },
                {
                    id:"5",
                    sender:"user",
                    message:"What are mentor doing?"
                },
                {
                    id:"6",
                    sender:"mentor",
                    message:"Nothing much"
                },
                {
                    id:"7",
                    sender:"user",
                    message:"Ok"
                }
        ],
        "chattwo":[
                {
                    id:"1",
                    sender:"user",
                    message:"Hello"
                },
                {
                    id:"2",
                    sender:"mentor",
                    message:"Hi"
                },
                {
                    id:"3",
                    sender:"user",
                    message:"How are mentor?"
                },
                {
                    id:"4",
                    sender:"mentor",
                    message:"I am fine"
                },
                {
                    id:"5",
                    sender:"user",
                    message:"What are mentor doing?"
                },
                {
                    id:"6",
                    sender:"mentor",
                    message:"Nothing much"
                },
                {
                    id:"7",
                    sender:"user",
                    message:"Ok"
                }
            ],
    },
    chats:{
        all:[
            {
                id:"chatone",
                name:"this is the doubt related to this topic of fmge medical exam sdfd dsffs dsd fsd sdfsdf",
                start:"12:00",
                mentor:"mentor 1",
                completed:false
            },
            {
                id:"chattwo",
                name:"Chat Two",
                start:"12:00",
                mentor:"mentor 2",
                completed:false
            },
            {
                id:"chatthree",
                name:"Chat Three",
                start:"12:00",
                mentor:"mentor 3",
                completed:false
            },
            {
                id:"chatfour",
                name:"Chat Four",
                start:"12:00",
                mentor:"mentor 4",
                completed:false
            },
            {
                id:"chatfive",
                name:"Chat Five",
                start:"12:00",
                mentor:"mentor 5",
                completed:false
            }
        ],
        new:["chatthree","chatfour","chatfive"],        
    },
    activeChatId : null,
    setActiveChatId : (id) => set((state) => ({activeChatId:id})),
    sendMessage : async (user,chatId,message) => {
        if(!message || !chatId || !user) return;
        const newMessage = {
            from:"user",
            message:message,
            time:Date.now()
        }
        try{
            const res = await addDoc(collection(db, "UserChats",user,chatId), newMessage);
            console.log("Document written with ID: ", res.id);
            set((state) => {
                const newMessages = state.messages[chatId].concat({
                    id:res.id,
                    sender:"user",
                    message:message
                });
                return {messages:{...state.messages,[chatId]:newMessages}}
            });
            return true;
        }
        catch(e){
            console.log(e);
            return false;
        }
        
    },
    subscribeToChat : (user,chatId) => {
        if(!user || !chatId) return;
        const unsubscribe = onSnapshot(collection(db, "UserChats",user,chatId), (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            set((state) => ({messages:{...state.messages,[chatId]:messages}}));
        });
        return unsubscribe;
    }
}));