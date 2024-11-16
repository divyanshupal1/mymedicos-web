import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommunityStore = create(
    persist(
        (set) => ({
            posts: {},
            addPost: (post) => set((state) => ({ posts: { ...state.posts, [post.id]: post } })),
            removePost: (id) => set((state) => {
                const { [id]: _, ...posts } = state.posts
                return { posts }
            }),
            updatePost: (id, post) => set((state) => ({ posts: { ...state.posts, [id]: post } })),
        }),
        { name: "community-store" }
    )
)