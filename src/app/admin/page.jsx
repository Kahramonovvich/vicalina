'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Админка 🛠</h1>
            <button
                onClick={() => {
                    Cookies.remove('token');
                    router.push('/login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Выйти
            </button>
        </div>
    );
}
