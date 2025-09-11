import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export function useAdminRedirect() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) return;
        if (!user || user.role !== 'admin') {
            router.replace('/');
        }
    }, [user]);
}
