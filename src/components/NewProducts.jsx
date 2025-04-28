'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useState } from 'react';
import { formatCurrency } from '@/utils/utils';
import Link from 'next/link';
import LikeButtonComponent from './LikeButtonComponent';
import RatingIcon from './RatingIcon';
import OneOrderModal from './OneOrder';

const translations = {
    uz: {
        newest: "Eng yangilar",
        seeMore: "Ko’proq ko’rish",
        popular: "Mashxur",
        buyNow: "Sotib olish",
        href: 'uz/catalog/all-products?filter=newest',
        prodHref: 'uz'
    },
    ru: {
        newest: "Новинки",
        seeMore: "Смотреть больше",
        popular: "Популярное",
        buyNow: "Купить",
        href: 'ru/catalog/all-products?filter=newest',
        prodHref: 'ru'
    }
};

function getNewestProducts(products, count = 4) {
    return [...products].slice(-count).reverse();
};

export default function NewProducts({ products, languageId }) {

    const t = Number(languageId) === 1 ? translations.uz : translations.ru;

    const newestProducts = getNewestProducts(products);

    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [activePrice, setActivePrice] = useState('');

    return (
        <div className="newProducts md:mt-[45px] mt-8">
            <OneOrderModal
                open={open}
                onClose={() => setOpen(false)}
                id={activeId}
                price={activePrice}
            />
            <div className="container">
                <div className="box md:mb-[45px] mb-8 flex items-center justify-between">
                    <h3 className="sectionTop">
                        {t.newest}
                    </h3>
                    <Link
                        href={t.href}
                        className='font-semibold md:text-xl leading-none underline text-[#484848]'>
                        {t.seeMore}
                    </Link>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-y-5 md:gap-x-14 gap-x-2">
                    {newestProducts?.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            setActiveId={setActiveId}
                            setActivePrice={setActivePrice}
                            setOpen={setOpen}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

function ProductCard({ product, setActiveId, setActivePrice, setOpen, t }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    const totalSlides = product.images.length;

    const getActiveDot = () => {
        if (activeIndex === 0) return 0;
        if (activeIndex === totalSlides - 1) return 2;
        return 1;
    };

    return (
        <div className="box flex flex-col rounded-xl overflow-hidden shadow-md transition-all duration-200 ease-in-out">
            <div className="top bg-[#F0F1F2]">
                <div className="flex items-center justify-between p-3.5">
                    <div className="py-2 px-2.5 opacity-0 cursor-default bg-orange rounded-md text-white font-semibold text-xs leading-none">
                        {t.popular}
                    </div>
                    <LikeButtonComponent id={product.id} />
                </div>
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        pauseOnMouseEnter: true,
                    }}
                    speed={1000}
                    modules={[Autoplay]}
                    onSlideChange={handleSlideChange}
                >
                    {product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="imgBox relative md:w-[170px] md:h-[170px] w-[100px] h-[100px] mx-auto">
                                <Image
                                    fill
                                    src={img.filePath}
                                    alt={`${product.name} - ${product.shortDescription}`}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center gap-1 mt-3.5 pb-2.5">
                    {[0, 1, 2].map((dotIdx) => (
                        <span
                            key={dotIdx}
                            className={`w-2.5 h-0.5 rounded-full ${getActiveDot() === dotIdx ? 'bg-[#222]' : 'bg-[#88888880]'}`}
                        />
                    ))}
                </div>
            </div>
            <div className="bottom flex-1 md:p-5 md:pt-2.5 p-3 pt-1 flex flex-col gap-y-1.5 justify-between">
                <Link
                    href={t.prodHref + product.slug}
                    className='text-[#222] md:leading-[23px] md:text-base text-sm hover:text-primary transition-all duration-200 ease-in-out'
                >
                    {`${product.name} ${product.shortDescription}`}
                </Link>
                <div className="flex flex-col gap-y-3">
                    <div className="ratingBox flex items-center gap-x-2.5">
                        <p className='text-[#484848] leading-[23px]'>
                            {product.rating}
                        </p>
                        <RatingIcon
                            value={product.rating}
                            className='!text-sm !text-orange'
                        />
                    </div>
                    <div className="priceBox md:flex items-center justify-between">
                        <p className='font-bold md:text-lg md:leading-[23px] mb-3 md:mb-0'>
                            {formatCurrency(product.discount ? product.newPrice : product.price)}
                        </p>
                        <button
                            onClick={() => {
                                setOpen(true);
                                setActiveId(product.id);
                                setActivePrice(product.discount ? product.newPrice : product.price);
                            }}
                            className='bg-primary text-white font-semibold text-sm px-4 py-3 rounded-md leading-none w-full md:w-auto'
                        >
                            {t.buyNow}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};