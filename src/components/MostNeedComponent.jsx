'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/utils';
import Link from 'next/link';
import LikeButtonComponent from './LikeButtonComponent';
import RatingIcon from './RatingIcon';
import OneOrderModal from './OneOrder';

const translations = {
    uz: {
        mostNeeded: "Eng kerakli",
        seeMore: "Ko’proq ko’rish",
        popular: "Mashxur",
        buyNow: "Sotib olish",
        href: 'uz'
    },
    ru: {
        mostNeeded: "Самое нужное",
        seeMore: "Смотреть больше",
        popular: "Популярное",
        buyNow: "Купить",
        href: 'ru'
    }
};

export default function MostNeedComponent({ products, languageId }) {
    const t = Number(languageId) === 1 ? translations.uz : translations.ru;

    const [mostNeed, setMostNeed] = useState([]);
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [activePrice, setActivePrice] = useState('');

    useEffect(() => {
        const filtered = products
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        setMostNeed(filtered);
    }, [products]);

    return (
        <div className='mostNeedComponent md:mt-[45px] mt-8'>
            <OneOrderModal
                open={open}
                onClose={() => setOpen(false)}
                id={activeId}
                price={activePrice}
            />
            <div className="container">
                <div className="box md:mb-[45px] mb-8 flex items-center justify-between">
                    <h3 className="sectionTop">
                        {t.mostNeeded}
                    </h3>
                    <Link
                        href={`/${t.href}/catalog/all-products`}
                        className='font-semibold md:text-xl leading-none underline text-[#484848]'
                    >
                        {t.seeMore}
                    </Link>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-y-5 gap-x-2 md:gap-x-14">
                    {mostNeed?.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            t={t}
                            setActiveId={setActiveId}
                            setActivePrice={setActivePrice}
                            setOpen={setOpen}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

function ProductCard({ product, t, setActiveId, setActivePrice, setOpen }) {
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
                    <div className="py-2 px-2.5 opacity-0 bg-orange rounded-md text-white font-semibold text-xs leading-none">
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
                            <div className="imgBox relative w-[170px] h-[170px] mx-auto">
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
            <div className="bottom flex-1 md:p-5 p-3 md:pt-2.5 pt-1 flex flex-col gap-y-1.5 justify-between">
                <Link
                    href={t.href + product.slug}
                    className='text-[#222] md:leading-[23px] text-sm md:text-base hover:text-primary transition-all duration-200 ease-in-out'
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