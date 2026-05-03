'use client';
import { useEffect, useState } from 'react';
import ProductsComponent from './ProductsComponent';
import AdminComponent from './AdminComponent';
import { useRouter } from 'next/navigation';
import OrdersComponent from './OrdersComponent';

export default function Admin({ products, admins, languageId, token, orders }) {

    const locale = Number(languageId) === 1 ? 'uz' : 'ru';
    const router = useRouter();

    const [activeComponent, setActiveComponent] = useState('Admin');

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/Auth/logout', {
                method: 'POST',
            });
            if (res.ok) {
                router.push(`/${locale}/login`);
            } else {
                alert('Xatolik!')
            };
        } catch (error) {
            console.error(error);
        };
    };

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
                        </div>
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
                        {activeComponent === 'Buyurtmalar' &&
                            <OrdersComponent
                                orders={orders}
                                products={products}
                                languageId={languageId}
                                token={token}
                            />}
                    </div>
                </div>
            </div>
        </div>
    );
};