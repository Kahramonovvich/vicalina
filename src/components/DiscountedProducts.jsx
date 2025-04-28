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
import { useMediaQuery } from '@/hooks/useMediaQuery';
import OneOrderModal from './OneOrder';

const translations = {
    uz: {
        buyNow: "Sotib olish",
        href: 'uz'
    },
    ru: {
        buyNow: "Купить",
        href: 'ru'
    }
};

const getDiscountedProducts = (products, isMobile) => {
    return [...products]
        .filter(product => product.discount && product.price && product.newPrice)
        .map(product => ({
            ...product,
            discountAmount: product.price - product.newPrice,
            discountPercent: ((product.price - product.newPrice) / product.price) * 100
        }))
        .sort((a, b) => b.discountPercent - a.discountPercent)
        .slice(0, isMobile ? 6 : 5);
};

export default function DiscountedProducts({ products, languageId }) {
    const t = Number(languageId) === 1 ? translations.uz : translations.ru;

    const isMobile = useMediaQuery('(max-width: 768px)');
    const discountedProducts = getDiscountedProducts(products, isMobile);

    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [activePrice, setActivePrice] = useState('');

    return (
        <div className="discountedProducts bg-orange px-5 md:py-11 py-5 mt-8 md:mt-[45px]">
            <OneOrderModal
                open={open}
                onClose={() => setOpen(false)}
                id={activeId}
                price={activePrice}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-5 gap-y-5 md:gap-y-0">
                <div className="grid grid-rows-2 gap-y-5">
                    {discountedProducts?.slice(0, 2).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            t={t}
                            // дальше твои пропсы:
                            top={'grid grid-cols-11'}
                            image={'md:w-[130px] w-[100px] md:h-[130px] h-[100px]'}
                            title={'text-sm md:leading-[18px]'}
                            priceText={'text-base md:leading-[18px]'}
                            info={'text-[10px] leading-none'}
                            stars={'!text-xs'}
                            like={{ w: '19', h: '17' }}
                            btn={'text-xs leading-none px-3 md:w-auto w-full py-2 mt-3 md:py-0 md:mt-0'}
                            pad={'px-3 py-2.5'}
                            bottom={'md:p-4 p-2 justify-center col-span-6'}
                            tText={'col-span-5'}
                            setActiveId={setActiveId}
                            setActivePrice={setActivePrice}
                            setOpen={setOpen}
                        />
                    ))}
                </div>
                <div className="md:col-span-2 grid grid-cols-2 gap-x-2 md:grid-cols-3 md:gap-y-0 gap-y-5 md:gap-x-5">
                    {discountedProducts?.slice(2, isMobile ? 6 : 5).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            t={t}
                            top={'flex flex-col'}
                            image={'md:w-[170px] md:h-[170px] w-[100px] h-[100px]'}
                            title={'md:leading-[23px] text-sm md:text-base'}
                            priceText={'md:text-lg md:leading-[23px]'}
                            info={'md:text-xs leading-none text-[10px]'}
                            stars={'!text-sm'}
                            btn={'text-sm leading-none px-4 md:w-auto w-full py-2 mt-3 md:py-0 md:mt-0'}
                            oldPrc={'text-xs md:leading-[23px]'}
                            pad={'md:p-3.5 p-3'}
                            bottom={'md:p-5 md:pt-2.5 p-3 pt-1 justify-between'}
                            tText={'md:block'}
                            setActiveId={setActiveId}
                            setActivePrice={setActivePrice}
                            setOpen={setOpen}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

function ProductCard({
    product,
    t,
    top,
    image,
    title,
    priceText,
    info,
    stars,
    like,
    btn,
    oldPrc,
    pad,
    bottom,
    tText,
    setActiveId,
    setActivePrice,
    setOpen,
}) {
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
        <div className={`box rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 ease-in-out ${top}`}>
            <div className={`top bg-[#F0F1F2] ${tText}`}>
                <div className={`flex items-center justify-between ${pad}`}>
                    <div className={`p-2 bg-orange rounded-md text-white font-semibold ${info}`}>
                        {`-${product.discountPercent.toFixed(0)}%`}
                    </div>
                    <LikeButtonComponent id={product.id} params={like} />
                </div>
                <Swiper
                    loop
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
            <div className={`bottom flex-1 ${bottom} flex flex-col gap-y-1.5 bg-white`}>
                <Link
                    href={t.href + product.slug}
                    className={`${title} text-[#222] hover:text-primary transition-all duration-200 ease-in-out`}
                >
                    {`${product.name} ${product.shortDescription}`}
                </Link>
                <div className="flex flex-col md:gap-y-2.5">
                    <div className="ratingBox flex items-center gap-x-2.5">
                        <p className={`text-[#484848] ${title}`}>
                            {product.rating}
                        </p>
                        <RatingIcon
                            value={product.rating}
                            className={`!text-orange ${stars}`}
                        />
                    </div>
                    <div className="priceBox md:flex justify-between">
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
                            onClick={() => {
                                setOpen(true);
                                setActiveId(product.id);
                                setActivePrice(product.discount ? product.newPrice : product.price);
                            }}
                            className={`bg-primary text-white font-semibold rounded-md ${btn}`}
                        >
                            {t.buyNow}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
