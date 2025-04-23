'use client';
import { useState } from 'react';
import ProductsComponent from './ProductsComponent';
import AdminComponent from './AdminComponent';

export default function Admin({ products, admins, languageId }) {

    const [activeComponent, setActiveComponent] = useState('Admin');

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
                        <button className='bg-primary text-white rounded-full px-5 py-2 w-max'>
                            Chiqish
                        </button>
                    </div>
                    <div className="col-span-9 border rounded-lg">
                        {activeComponent === 'Admin' && <AdminComponent admins={admins} />}
                        {activeComponent === 'Mahsulotlar' && <ProductsComponent products={products} languageId={languageId} />}
                        {activeComponent === 'Buyurtmalar' && ''}
                    </div>
                </div>
            </div>
        </div>
    );
};