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

export default function MostNeedComponent({ products }) {

    const [mostNeed, setMostNeed] = useState([]);

    useEffect(() => {
        const filtered = products
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        setMostNeed(filtered);
    }, [products]);

    return (
        <div className='mostNeedComponent mt-[45px]'>
            <div className="container">
                <div className="box mb-[45px] flex items-center justify-between">
                    <h3 className="sectionTop">
                        Eng kerakli
                    </h3>
                    <Link
                        href={'/catalog/barcha-mahsulotlar'}
                        className='font-semibold text-xl leading-none underline text-[#484848]'>
                        Ko’proq ko’rish
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-x-14">
                    {mostNeed?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
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
        <div className="box flex flex-col rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 ease-in-out">
            <div className="top bg-[#F0F1F2]">
                <div className="flex items-center justify-between p-3.5">
                    <div className="py-2 px-2.5 opacity-0 bg-orange rounded-md text-white font-semibold text-xs leading-none">
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
                    modules={[Autoplay]}
                    onSlideChange={handleSlideChange}
                >
                    {product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="imgBox relative w-[170px] h-[170px] mx-auto">
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
            <div className="bottom flex-1 p-5 pt-2.5 flex flex-col gap-y-1.5 justify-between">
                <Link
                    href={product.slug}
                    className='text-[#222] leading-[23px] hover:text-primary transition-all duration-200 ease-in-out'
                >
                    {`${product.name}`}
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
                    <div className="priceBox flex items-center justify-between">
                        <p className='font-bold text-lg leading-[23px]'>
                            {formatCurrency(product.discount ? product.newPrice : product.price)}
                        </p>
                        <button
                            className='bg-primary text-white font-semibold text-sm px-4 py-3 rounded-md leading-none'
                        >
                            Sotib olish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};