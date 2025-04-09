'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            Cookies.set('token', 'some-secret-token', { path: '/' }); // обязательно path!
            router.push('/admin');
        } else {
            alert('Неверный пароль');
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-6">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль: admin123"
                className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Войти
            </button>
        </form>
    );
};