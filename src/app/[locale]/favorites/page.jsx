'use client'
import { useEffect, useState } from 'react'
import Link from "next/link"
import HomeIcon from '@/icons/home.svg'
import TopArrowICon from '@/icons/topArrow.svg'
import { productsSlug } from "@/utils/utils"
import FavoriteProductItem from '@/components/FavoriteProductItem'
import { usePathname } from 'next/navigation'

const translations = {
    uz: {
        favorites: "Saralangan",
        product: "Maxsulot",
        price: "Narx",
        status: "Holati",
        empty: "Saralangan maxsulotlar yo‘q",
    },
    ru: {
        favorites: "Избранное",
        product: "Товар",
        price: "Цена",
        status: "Статус",
        empty: "Нет избранных товаров",
    }
};

export default function Favorites() {
    const locale = usePathname().split('/')[1];
    const langMap = { uz: 1, ru: 2 };
    const languageId = langMap[locale] || 1;
    const t = languageId === 1 ? translations.uz : translations.ru;

    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/Products/GetAllProducts?languageId=${languageId}`);
            const products = await res.json();
            const productsWithSlug = await productsSlug(products);

            const liked = localStorage.getItem('likedProducts');
            const likedIds = liked ? JSON.parse(liked) : [];

            const filtered = productsWithSlug.filter(product => likedIds.includes(product.id));
            setFavoriteProducts(filtered);
            setProducts(products);
        };

        fetchData();
    }, [languageId]);

    return (
        <div className="favorites">
            <div className="container">
                <div className="top md:my-12 my-5 flex items-center gap-x-3">
                    <Link href={'/'}>
                        <HomeIcon />
                    </Link>
                    <TopArrowICon />
                    <p className='text-primary leading-normal'>
                        {t.favorites}
                    </p>
                </div>
                <h2 className="mb-5 font-semibold text-[32px] leading-tight">
                    {t.favorites}
                </h2>
                <div className="box py-4 border rounded-lg">
                    <div className="top grid grid-cols-12 pb-4 px-6 border-b uppercase font-medium text-sm leading-none text-[#808080]">
                        <div className="box col-span-5">{t.product}</div>
                        <div className="box col-span-3">{t.price}</div>
                        <div className="box col-span-4">{t.status}</div>
                    </div>
                    <div className="bottom mt-3 flex flex-col">
                        {favoriteProducts.map(product => (
                            <FavoriteProductItem
                                key={product.id}
                                product={product}
                                onRemove={() => {
                                    setFavoriteProducts(prev => prev.filter(p => p.id !== product.id))
                                }}
                                products={products}
                                languageId={languageId}
                            />
                        ))}
                        {favoriteProducts.length === 0 && (
                            <p className="text-center text-gray-500 py-6">
                                {t.empty}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
