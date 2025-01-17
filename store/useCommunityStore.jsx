import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requestHandler";
import { comment } from "postcss";
import { create } from "zustand";

export const useCommunityStore = create((set, get) => ({
    posts: {},
    questions: {},
    comments: {},
    postComments: {},
    feedQestions: {
        data: [],
        loading: true,
        error: null,
        loaded: false
    },
    fetchFeed: async () => {
        const res = await requestHandler(
            axiosInstance.get('/questions/feed'),
            (data) => {
                const tempQuestions = {}
                const tempFeed = []
                data.data.questions.forEach((question) => {
                    tempFeed.push(question._id)
                    tempQuestions[question._id] = {...question,relatedPosts:null}
                })
                set({ 
                    feedQestions: { data: tempFeed, loading: false, loaded: true },
                    questions: {...get().questions,...tempQuestions},
                })
            },
            { 
                setLoading: (loading) => set({ 
                    feedQestions: { ...get().feedQestions,loading } 
                }), 
                setError: (error) => set({ 
                    feedQestions: { ...get().feedQestions,error } 
                }) 
            }
        )
        return res
    },
    fetchQuestionById: async (id) => {
        const res = await requestHandler(
            axiosInstance.get(`/questions/${id}`),
            (data) => {
                const tempPosts = {}
                const tempRelatedPosts = []
                data.data.relatedPosts.forEach((post) => {
                    tempPosts[post._id] = post
                    tempRelatedPosts.push(post._id)
                })
                set({ 
                    questions: { ...get().questions, [id]: {...get().questions?.[id],data:{...data.data.question,relatedPosts:tempRelatedPosts}} },
                    posts: { ...get().posts, ...tempPosts } 
                })
            },
            { 
                setLoading: (loading) => set({ 
                    questions: { ...get().questions, [id]: {...get().questions[id], loading } } 
                }), 
                setError: (error) => set({ 
                    questions: { ...get().questions, [id]: {...get().questions[id], error } } 
                }) 
            }
        )
        return res
    },
    fetchPostById: async (id) => {
        const res = await requestHandler(
            axiosInstance.get(`/posts/${id}`),
            (data) => {
                set({ posts: { ...get().posts, [id]:data.data } })
            }
        )
        return res
    },
    likePost: async (id) => {
        const prevState = get().posts[id]
        console.log("prevState ",prevState)
        set({ 
            posts: { 
                ...get().posts, 
                [id]:{
                    ...prevState,
                    liked:!prevState.liked,
                    likeCount:prevState.liked ? prevState.likeCount-1 : prevState.likeCount+1
                } 
            } 
        })
        console.log("updated",get().posts[id])
        

        const res = requestHandler(
            axiosInstance.patch(`/posts/${id}/like`),
            (data) => {
                set({ posts: { ...get().posts, [id]:data.data } })
            },{
                setError : (error) => {
                    set({
                        posts: { 
                            ...get().posts, 
                            [id]: prevState 
                        }
                    })
                }
            }
        )

        return res
    },
    getPostComments: async (id) => {

        const buildCommentTree = (comments, parentId = null) => {
            return comments
              .filter((comment) => comment.parentComment === parentId)
              .map((comment) => ({
                _id: comment._id,
                parent: comment.parentComment,
                children: buildCommentTree(comments, comment._id),
              }));
          };

        const res = await requestHandler(
            axiosInstance.get(`/posts/${id}/comments`),
            (data) => {
                const tempComments = {}
                data.data.comments.forEach((comment) => {
                    tempComments[comment._id] = comment
                })
                const commentTree = buildCommentTree(data.data.comments)
                set({ 
                    comments: { ...get().comments,...tempComments },
                    postComments: { ...get().postComments, [id]: {
                        ...get().postComments[id],
                        data: commentTree,
                        loaded: true
                    } }
                 })
            },{
                setLoading : (loading) => {
                    set({ 
                        postComments: { ...get().postComments, [id]: { 
                            ...get().postComments[id],
                            loaded: false, 
                            loading 
                        } } 
                    })
                },
                setError : (error) => {
                    set({ 
                        postComments: { ...get().postComments, [id]: { 
                            ...get().postComments[id], 
                            error
                         } } 
                    })
                }
            }
        )
        return res
    },
    commentOnPost: async (id,parent=null,body) => {
        const res = requestHandler(
            axiosInstance.post(`/posts/${id}/comments`,parent==null?{body}:{body,parentComment:parent}),
            (data)=>{

            }
        )
    },
    deleteCommentFromPost : async (commentId) => {
        const prevTree = get().postComments
        const deleteCommentFromTree = () => {
            return get().postComments
              .map((node) => {
                // If the node has children, recursively process them
                if (node.children && node.children.length > 0) {
                  return {
                    ...node,
                    children: deleteCommentFromTree(node.children, commentId),
                  };
                }
                return node;
              })
              .filter((node) => node._id !== commentId); // Exclude the node with the given ID
        };

        const updatedTree = deleteCommentFromTree()
        set({
            postComments:updatedTree
        })

        const res = requestHandler(
            axiosInstance.delete(`/comments/${commentId}`),
            (data)=>{
                if(data.status==200){
                    const temp = get().comments
                    delete temp[commentId]
                    set({
                        comments:{...temp}
                    })
                }
            },{
                setError:()=>{
                    set({
                        postComments:prevTree
                    })
                }
            }
        )
        
          
    },
    editPostComment : async (id,body) => {
        const prevComment = get().comments[id]
        set({
            ...get().comments,
            [id]:{
                ...get().comments[id],
                body:body
            }
        })
        const res = requestHandler(
            axiosInstance.patch(`/comments/${id}`,{body}),
            (data)=>{
                if(data.success){
                    set({
                        ...get().comments,
                        [id]:data.data.comment
                    })
                }
            },{
                setError:()=>{
                    set({
                        comments:{
                            ...get().comments,
                            [id]:prevComment
                        }
                    })
                }
            }
        )
    }

}))

