'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/Auth/loginForAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
            credentials: 'include',
        });

        if (res.ok) {
            router.push('/admin'); // редирект после логина
        } else {
            alert('Неверный логин или пароль');
        }
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
            <button className='bg-black text-white p-2 rounded hover:opacity-80'>Войти</button>
        </form>
    );
};