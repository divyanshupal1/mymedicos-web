import { axiosInstance } from "@/lib/axiosInstance";
import { requestHandler } from "@/lib/requestHandler";
import { create } from "zustand";

const buildCommentTree = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentComment === parentId)
      .map((comment) => ({
        _id: comment._id,
        parent: comment.parentComment,
        children: buildCommentTree(comments, comment._id),
      }));
  };

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
    flashcardFeed: {
        data: [],
        loading: true,
        loaded: false,
        error: null
    },
    postFeed: {
        data: [],
        loading: true,
        loaded: false,
        error: null
    },
    //questions
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
    createQuestion: async (title, body, tags) => {
        const res = requestHandler(
            axiosInstance.post('/questions',{title,body,tags}),
            (data) => {
                set({ 
                    questions: { ...get().questions, [data.data.question._id]: data.data.question } 
                })
            },
        )
        return res
    },
    addQuestionAnswer: async (id, body) => {
        const res = requestHandler(
            axiosInstance.post(`/posts`,{question:id,body}),
            (data) => {
                const post = data.data.post[0]
                set({ 
                    questions: { 
                        ...get().questions, 
                        [id]: { 
                            ...get().questions[id], 
                            data: { 
                                ...get().questions[id].data, 
                                relatedPosts: [...get().questions[id].data.relatedPosts, post._id] 
                            } 
                        } 
                    },
                    posts: { ...get().posts, [post._id]: post } 
                })
            }
        )
        return res
    },
    //posts
    createPost : async (title,body,tags) => {
        const res = requestHandler(
            axiosInstance.post('/posts',{title,body,tags,post:true}),
            (data) => {
                set({ 
                    posts: { ...get().posts, [data.data.post._id]: data.data.post } 
                })
            }
        )
        return res
    },
    getPostFeed: async () => {
        const res = await requestHandler(
            axiosInstance.get('/posts/feed'),
            (data)=>{
                const tempPosts = {}
                const tempFeed = []
                data.data.posts.forEach((post) => {
                    tempFeed.push(post._id)
                    tempPosts[post._id] = post
                })
                set({ 
                    postFeed: { data: tempFeed, loading: false, loaded: true },
                    posts:{...get().posts,...tempPosts}
                })
            },
            {
                setLoading:(loading)=>set({
                    postFeed:{...get().postFeed,loading}
                }),
                setError:(error)=>set({
                    postFeed:{...get().postFeed,error}
                })
            }
        )
    },
    createFlashCard : async (title,body,tags,readtime) => {
        const res = requestHandler(
            axiosInstance.post('/posts',{title,body,tags,readtime,flashcard:true}),
            (data) => {
                set({ 
                    posts: { ...get().posts, [data.data.post._id]: data.data.post } 
                })
            }
        )
        return res
    },
    getFlashcardFeed: async () => {
        const res = await requestHandler(
            axiosInstance.get('/posts/flashcards/feed'),
            (data) => {
                const tempPosts = {}
                const tempFeed = []
                data.data.flashcards.forEach((post) => {
                    tempFeed.push(post._id)
                    tempPosts[post._id] = post
                })
                set({ 
                    flashcardFeed: { data: tempFeed, loading: false, loaded: true },
                    posts:{...get().posts,...tempPosts}
                })
            },
            { 
                setLoading: (loading) => set({ 
                    flashcardFeed: { ...get().flashcardFeed,loading } 
                }), 
                setError: (error) => set({ 
                    flashcardFeed: { ...get().flashcardFeed,error } 
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
                get().getPostComments(id)
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
                    get().getPostComments(data.data.comment.post)
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
        return res
    }

}))

