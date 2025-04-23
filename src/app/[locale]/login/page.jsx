'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);

        const res = await fetch('/api/Auth/loginForAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
            credentials: 'include',
        });

        if (res.ok) {
            router.push('/admin');
            setIsloading(false);
        } else {
            alert('Неверный логин или пароль');
            setIsloading(false);
        };
    };

    return (
        <form onSubmit={handleSubmit} className='login max-w-sm mx-auto mt-10 flex flex-col gap-4'>
            <input
                className='border p-2 rounded'
                type='text'
                placeholder='Login'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
            />
            <input
                className='border p-2 rounded'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button
                disabled={isLoading}
                className='bg-black text-white p-2 rounded hover:opacity-80'>
                {isLoading ? 'Kirilmoqda...' : 'Kirish'}
            </button>
        </form>
    );
};