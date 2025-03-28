'use client'
import { useEffect, useState } from 'react'
import Link from "next/link"
import HomeIcon from '@/icons/home.svg'
import TopArrowICon from '@/icons/topArrow.svg'
import { getAllProducts } from "../../../lib/api"
import { productsSlug } from "@/utils/utils"
import FavoriteProductItem from '@/components/FavoriteProductItem'

export default function Favorites() {
    const [favoriteProducts, setFavoriteProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const products = await getAllProducts();
            const productsWithSlug = productsSlug(products);

            const liked = localStorage.getItem('likedProducts');
            const likedIds = liked ? JSON.parse(liked) : [];

            const filtered = productsWithSlug.filter(product => likedIds.includes(product.id));
            setFavoriteProducts(filtered);
        };

        fetchData();
    }, []);

    return (
        <div className="favorites">
            <div className="container">
                <div className="top my-12 flex items-center gap-x-3">
                    <Link href={'/'}>
                        <HomeIcon />
                    </Link>
                    <TopArrowICon />
                    <p className='text-primary leading-normal'>
                        Saralangan
                    </p>
                </div>
                <h2 className="mb-5 font-semibold text-[32px] leading-tight">
                    Saralangan
                </h2>
                <div className="box py-4 border rounded-lg">
                    <div className="top grid grid-cols-12 pb-4 px-6 border-b uppercase font-medium text-sm leading-none text-[#808080]">
                        <div className="box col-span-5">Maxsulot</div>
                        <div className="box col-span-3">Narx</div>
                        <div className="box col-span-4">Holati</div>
                    </div>
                    <div className="bottom mt-3 flex flex-col">
                        {favoriteProducts.map(product => (
                            <FavoriteProductItem
                                key={product.id}
                                product={product}
                                onRemove={() => {
                                    setFavoriteProducts(prev => prev.filter(p => p.id !== product.id))
                                }}
                            />
                        ))}
                        {favoriteProducts.length === 0 && (
                            <p className="text-center text-gray-500 py-6">
                                Saralangan maxsulotlar yo‘q
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};