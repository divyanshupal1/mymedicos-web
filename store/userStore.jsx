import { create } from "zustand";

export const useUserStore = create((set) => ({
    user:null,
    loading: true,
    loaded:false,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setLoaded: (loaded) => set({ loaded }),    
}));