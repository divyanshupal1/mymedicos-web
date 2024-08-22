"use client"
import { useUserStore } from '@/store/userStore'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';

export function useCustomAuth(query) {
    const router = useRouter();
    const { toast } = useToast();
    const { loggeduser, setUser } = useUserStore((state) => ({
        loggeduser: state.user,
        setUser: state.setUser
    }));
    React.useEffect(() => {
        if (loggeduser != null) {
            if (query != '/') router.push(query);
            if(query =='/') router.push('/home')
            return;
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                loggeduser == null && toast({
                    title: `Welcome back ${user.displayName != null ? user.displayName : ""} 😊 !`,
                });
                fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ user: user }),
                }).then(async (res) => {
                    const data = await res.json();
                    if (data.success) {
                        setUser({ ...user, subscription: data.subscription });
                        if (query !== '/') router.push(query);
                        if(query =='/') router.push('/home')
                    } else {
                        setUser(null);
                        router.push('/login');

                    }
                });

            } else {
                setUser(null);
                if (query != '/') router.push('/login');
            }
        });
    }, []);

    return {user:loggeduser};
}