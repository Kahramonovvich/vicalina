'use client';
import { useEffect, useState } from 'react';
import ProductsComponent from './ProductsComponent';
import AdminComponent from './AdminComponent';
import { useRouter } from 'next/navigation';

export default function Admin({ products, admins, languageId, token, expiresAt }) {

    const locale = Number(languageId) === 1 ? 'uz' : 'ru';
    const router = useRouter();

    const [activeComponent, setActiveComponent] = useState('Admin');
    const [timeLeft, setTimeLeft] = useState(expiresAt - Date.now());

    const formatTime = (ms) => {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/Auth/logout', {
                method: 'POST',
            });
            if (res.ok) {
                router.push(`/${locale}/login`);
            } else {
                alert('Xatolik!')
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const now = Date.now();
        const timeLeft = expiresAt - now;

        if (timeLeft > 0) {
            const timeout = setTimeout(() => {
                handleLogout();
            }, timeLeft);
            console.log(`Автовыход через ${Math.floor(timeLeft / 1000 / 60)} минут`);
            return () => clearTimeout(timeout);
        } else {
            handleLogout();
        }
    }, [expiresAt]);

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = expiresAt - Date.now();
            if (remaining <= 0) {
                clearInterval(interval);
            }
            setTimeLeft(remaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiresAt]);

    return (
        <div className="admin mt-10">
            <div className="container">
                <div className="grid grid-cols-12 gap-x-5">
                    <div className="col-span-3 flex flex-col gap-y-3">
                        <div
                            className={`box text-xl font-semibold p-3 rounded-lg cursor-pointer
                                ${activeComponent === 'Admin' ? 'bg-slate-100' : ''}`}
                            onClick={() => setActiveComponent('Admin')}
                        >
                            Admin
                        </div>
                        <div
                            className={`box text-xl font-semibold p-3 rounded-lg cursor-pointer
                                ${activeComponent === 'Mahsulotlar' ? 'bg-slate-100' : ''}`}
                            onClick={() => setActiveComponent('Mahsulotlar')}
                        >
                            Mahsulotlar
                        </div>
                        <div
                            className={`box text-xl font-semibold p-3 rounded-lg cursor-pointer
                                ${activeComponent === 'Buyurtmalar' ? 'bg-slate-100' : ''}`}
                            onClick={() => setActiveComponent('Buyurtmalar')}
                        >
                            Buyurtmalar
                        </div>
                        <div className="box flex items-center justify-between">
                            <button
                                onClick={() => handleLogout()}
                                className='bg-primary px-5 py-2 text-white rounded-full font-semibold'>
                                Chiqish
                            </button>
                            <div
                                className={`box px-5 py-2 border rounded-full font-semibold transition-all duration-500
                                    ${timeLeft <= 60_000 ? 'text-red-600 animate-pulse border-red-500' : ''}`}
                            >
                                {formatTime(timeLeft)}
                            </div>
                        </div>
                        {timeLeft <= 30_000 && (
                            <div className="text-red-500 font-bold animate-pulse mt-2 text-sm border border-red-500 px-5 py-2 text-center rounded-full">

                                Chiqishga {Math.ceil(timeLeft / 1000)} soniya qoldi!
                            </div>
                        )}
                    </div>
                    <div className="col-span-9 border rounded-lg">
                        {activeComponent === 'Admin' && <AdminComponent admins={admins} token={token} />}
                        {activeComponent === 'Mahsulotlar' &&
                            <ProductsComponent
                                products={products}
                                languageId={languageId}
                                token={token}
                            />
                        }
                        {activeComponent === 'Buyurtmalar' && ''}
                    </div>
                </div>
            </div>
        </div>
    );
};