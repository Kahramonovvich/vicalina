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

const getDiscountedProducts = (products) => {
    return [...products]
        .filter(product => product.discount && product.price && product.newPrice)
        .map(product => ({
            ...product,
            discountAmount: product.price - product.newPrice,
            discountPercent: ((product.price - product.newPrice) / product.price) * 100
        }))
        .sort((a, b) => b.discountPercent - a.discountPercent)
        .slice(0, 5);
};

export default function DiscountedProducts({ products }) {

    const discountedProducts = getDiscountedProducts(products);

    return (
        <div className="discountedProducts bg-orange px-5 py-11 mt-[45px]">
            <div className="grid grid-cols-3 gap-x-5">
                <div className="grid grid-rows-2 gap-y-5">
                    {discountedProducts?.slice(0, 2).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            top={'grid grid-cols-11'}
                            image={'w-[130px] h-[130px]'}
                            title={'text-sm leading-[18px]'}
                            priceText={'text-base leading-[18px]'}
                            info={'text-[10px] leading-none'}
                            stars={'!text-xs'}
                            like={{ w: '19', h: '17' }}
                            btn={'text-xs leading-none px-3'}
                            pad={'px-3 py-2.5'}
                            bottom={'p-4 justify-center col-span-6'}
                            t={'col-span-5'}
                        />
                    ))}
                </div>
                <div className="col-span-2 grid grid-cols-3 gap-x-5">
                    {discountedProducts?.slice(2, 5).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            top={'flex flex-col'}
                            image={'w-[170px] h-[170px]'}
                            title={'leading-[23px]'}
                            priceText={'text-lg leading-[23px]'}
                            info={'text-xs leading-none'}
                            stars={'!text-sm'}
                            btn={'text-sm leading-none px-4'}
                            oldPrc={'text-xs leading-[23px]'}
                            pad={'p-3.5'}
                            bottom={'p-5 pt-2.5 justify-between'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

function ProductCard({ product, top, image, title, priceText, info, stars, like, btn, oldPrc, pad, bottom, t }) {
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
        <div
            className={`box rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 ease-in-out ${top}`}
        >
            <div className={`top bg-[#F0F1F2] ${t}`}>
                <div className={`flex items-center justify-between ${pad}`}>
                    <div className={`p-2 bg-orange rounded-md text-white font-semibold ${info}`}>
                        {`-${product.discountPercent.toFixed(0)}%`}
                    </div>
                    <LikeButtonComponent id={product.id} params={like} />
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
                            <div className={`imgBox relative ${image} mx-auto`}>
                                <Image
                                    fill
                                    src={img}
                                    alt={`${product.name} - ${product.shortDesc}`}
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
            <div className={`bottom flex-1 ${bottom} flex flex-col gap-y-1.5 bg-white`}>
                <Link
                    href={product.slug}
                    className={`${title} text-[#222] hover:text-primary transition-all duration-200 ease-in-out`}
                >
                    {`${product.name}`}
                </Link>
                <div className="flex flex-col gap-y-2.5">
                    <div className="ratingBox flex items-center gap-x-2.5">
                        <p className={`text-[#484848] ${title}`}>
                            {product.rating.rate}
                        </p>
                        <RatingIcon
                            value={product.rating.rate}
                            className={`!text-orange ${stars}`}
                        />
                    </div>
                    <div className="priceBox flex justify-between">
                        <div className="textBox">
                            <p className={`font-bold text-[#48484899] relative inline-block ${info} ${oldPrc}
                                after:absolute after:w-full after:h-px after:left-0 after:top-1/2 after:bg-[#48484899]`}
                            >
                                {formatCurrency(product.price)}
                            </p>
                            <p className={`font-bold ${priceText}`}>
                                {formatCurrency(product.discount ? product.newPrice : product.price)}
                            </p>
                        </div>
                        <button
                            className={`bg-primary text-white font-semibold rounded-md ${btn}`}
                        >
                            Sotib olish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};