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

function getTopProducts(products, topN = 4) {
    return [...products]
        .sort((a, b) => {
            const scoreA = a.rating.rate * (1 - 1 / (a.rating.count + 1));
            const scoreB = b.rating.rate * (1 - 1 / (b.rating.count + 1));
            return scoreB - scoreA;
        })
        .slice(0, topN);
};

export default function TopProducts({ products }) {

    const topProducts = getTopProducts(products);

    return (
        <div className="topProducts md:mt-[45px] mt-8">
            <div className="container">
                <h3 className="sectionTop md:mb-[45px] mb-8">
                    Eng yaxshi takliflar
                </h3>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-y-5 gap-x-2 md:gap-x-14">
                    {topProducts?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
};

function ProductCard({ product }) {
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
                <div className="flex items-center justify-between md:p-3.5 p-3">
                    <div className="py-2 px-2.5 bg-orange rounded-md text-white font-semibold text-xs leading-none">
                        Mashxur
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
                    onSlideChange={handleSlideChange}
                    modules={[Autoplay]}
                >
                    {product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="imgBox relative md:w-[170px] md:h-[170px] w-[100px] h-[100px] mx-auto">
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
            <div className="bottom flex-1 md:p-5 p-3 md:pt-2.5 pt-1 flex flex-col gap-y-1.5 justify-between">
                <Link
                    href={product.slug}
                    className='text-[#222] md:leading-[23px] text-sm md:text-base hover:text-primary transition-all duration-200 ease-in-out'
                >
                    {`${product.name} ${product.shortDesc}`}
                </Link>
                <div className="flex flex-col gap-y-3">
                    <div className="ratingBox flex items-center gap-x-2.5">
                        <p className='text-[#484848] leading-[23px]'>
                            {product.rating.rate}
                        </p>
                        <RatingIcon
                            value={product.rating.rate}
                            className='!text-sm !text-orange'
                        />
                    </div>
                    <div className="priceBox md:flex items-center justify-between">
                        <p className='font-bold md:text-lg md:leading-[23px] mb-3 md:mb-0'>
                            {formatCurrency(product.discount ? product.newPrice : product.price)}
                        </p>
                        <button
                            className='bg-primary text-white font-semibold text-sm px-4 py-3 rounded-md leading-none w-full md:w-auto'
                        >
                            Sotib olish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};