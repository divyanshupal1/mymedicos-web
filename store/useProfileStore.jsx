import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requestHandler";
import { get } from "react-hook-form";
import { create } from "zustand";

const initialState = {
    data:[],
    loading:true,
    loaded:false,
    error:null
}

export const useProfileStore = create((set,get) => ({
    questions:initialState,
    answers:initialState,
    posts:initialState,
    flashcards:initialState,
    comments:initialState,
    likes:initialState,
    bookmarks:initialState,
    getMyQuestions:async(uid)=>{
        const res = requestHandler(
            axiosInstance.get(`users/${uid}/questions`),
            (data)=>{
                set({questions:{data:data.data.questions,loading:false,loaded:true,error:null}})
            },{
                setLoading:(loading)=>set({questions:{...get().questions,loading}}),
                setError:(error)=>set({questions:{...get().questions,error}})
            }
        )
        return res
    },
    getMyAnswers:async(uid)=>{
        const res = requestHandler(
            axiosInstance.get(`users/${uid}/answers`),
            (data)=>{
                set({answers:{data:data.data.answers,loading:false,loaded:true,error:null}})
            },{
                setLoading:(loading)=>set({answers:{...get().answers,loading}}),
                setError:(error)=>set({answers:{...get().answers,error}})
            }
        )
        return res
    },
    getMyPosts:async(uid)=>{
        const res = requestHandler(
            axiosInstance.get(`users/${uid}/posts`),
            (data)=>{
                set({posts:{data:data.data.posts,loading:false,loaded:true,error:null}})
            },{
                setLoading:(loading)=>set({posts:{...get().posts,loading}}),
                setError:(error)=>set({posts:{...get().posts,error}})
            }
        )
        return res
    },
    getMyFlashcards:async(uid)=>{
        const res = requestHandler(
            axiosInstance.get(`users/${uid}/flashcards`),
            (data)=>{
                set({flashcards:{data:data.data.flashcards,loading:false,loaded:true,error:null}})
            },{
                setLoading:(loading)=>set({flashcards:{...get().flashcards,loading}}),
                setError:(error)=>set({flashcards:{...get().flashcards,error}})
            }
        )
        return res
    },

}));   