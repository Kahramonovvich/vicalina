'use client'
import { useState } from "react";
import UserICon from '@/icons/comUser.svg'
import RatingIcon from "./RatingIcon";
import { Rating } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

export default function ProductInfoComponents({ product }) {

    const [activeComponent, setActiveComponent] = useState('Tavsif');
    const [value, setValue] = useState(0);

    return (
        <div className="box">
            <div className="border-b mb-8">
                <div className="container">
                    <div className="top flex items-center justify-center">
                        <button
                            onClick={() => setActiveComponent('Tavsif')}
                            className={`text-[#808080] font-medium leading-normal p-4
                        ${activeComponent === 'Tavsif' ? 'border-b-2 border-primary' : ''}`}
                        >
                            Tavsif
                        </button>
                        <button
                            onClick={() => setActiveComponent('Mahsulot haqida')}
                            className={`text-[#808080] font-medium leading-normal p-4
                        ${activeComponent === 'Mahsulot haqida' ? 'border-b-2 border-primary' : ''}`}
                        >
                            Mahsulot haqida
                        </button>
                        <button
                            onClick={() => setActiveComponent('Mijozlar fikri')}
                            className={`text-[#808080] font-medium leading-normal p-4
                        ${activeComponent === 'Mijozlar fikri' ? 'border-b-2 border-primary' : ''}`}
                        >
                            Mijozlar fikri
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="bottom">
                    {activeComponent === 'Tavsif' && (
                        <div className="box leading-normal text-sm text-[#808080]">
                            {product.fullDesc}
                        </div>
                    )}
                    {activeComponent === 'Mahsulot haqida' && (
                        <div className="box flex">
                            <div className="box w-28">
                                <p className="text-sm leading-normal">Og'irligi:</p>
                                <p className="text-sm leading-normal">Rang:</p>
                                <p className="text-sm leading-normal">Turi:</p>
                                <p className="text-sm leading-normal">Katalog:</p>
                                <p className="text-sm leading-normal">Mavjud:</p>
                                <p className="text-sm leading-normal">Teglar:</p>
                            </div>
                            <div className="box">
                                <p className="text-sm leading-normal text-[#666666]">{product.weight}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.color}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.type}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.category?.charAt(0).toLocaleUpperCase() + product.category.toLocaleLowerCase().slice(1)}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.qty > 0 ? `Mavjud (${product.qty})` : 'Tez orada'}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.tages}</p>
                            </div>
                        </div>
                    )}
                    {activeComponent === 'Mijozlar fikri' && (
                        <div className="box grid grid-cols-5 gap-x-10">
                            <div className="col-span-3">
                                <div className="top mb-4">
                                    <h3 className="font-medium leading-normal text-2xl">
                                        Fikrlar
                                    </h3>
                                </div>
                                {product.comments.map((com, index) => (
                                    <div
                                        key={index}
                                        className="box pb-5 mb-5 border-b"
                                    >
                                        <div className="top flex gap-x-3">
                                            <UserICon />
                                            <div className="box">
                                                <p className="text-sm font-medium leading-normal">{com.clientName}</p>
                                                <RatingIcon
                                                    value={com.clientRate}
                                                    className='!text-base !text-orange'
                                                />
                                            </div>
                                        </div>
                                        <div className="bottom mt-3 text-sm leading-normal text-[#808080]">
                                            {com.clientComment}
                                        </div>
                                    </div>
                                ))}
                                <button className="text-primary py-3.5 border-2 border-primary w-full rounded text-sm font-semibold leading-tight">
                                    Ko’proq ko’rish
                                </button>
                            </div>
                            <div className="box col-span-2">
                                <div className="top mb-4">
                                    <h3 className="font-medium leading-normal text-2xl">
                                        Fikr qoldirish
                                    </h3>
                                </div>

                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm mb-1">Ism Familiya</label>
                                        <input
                                            type="text"
                                            placeholder="Ism Familiyangiz"
                                            className="w-full border rounded px-4 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Tel raqam</label>
                                        <input
                                            type="tel"
                                            placeholder="+998 99 000 00 00"
                                            className="w-full border-2 border-indigo-900 rounded px-4 py-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Baholang</label>
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            icon={<StarRoundedIcon className='!text-xl !text-orange' />}
                                            emptyIcon={<StarBorderRoundedIcon className='!text-xl !text-orange' />}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Fikr yozish</label>
                                        <textarea
                                            placeholder="Fikringizni qoldiring..."
                                            className="w-full border rounded px-4 py-2"
                                            rows="4"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-indigo-900 text-white px-6 py-2 rounded hover:bg-indigo-800 transition"
                                    >
                                        Fikr qoldirish
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};