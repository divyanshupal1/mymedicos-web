"use client"
import { useUserStore } from '@/store/userStore'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';


const UserObserver = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { loggeduser, setUser } = useUserStore((state) => ({
        loggeduser: state.user,
        setUser: state.setUser
    }));

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
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
                        setUser({ ...user, subscription: data.subscription,doc:data.doc });
                        if(user.displayName===null || data.doc==null) router.push('/auth/signup')
                    } else {
                        setUser(null);
                    }
                });

            } else {
                setUser(null);
            }
        });

        return unsubscribe
    },[])

  return (
    <></>
  )
}

export default UserObserver