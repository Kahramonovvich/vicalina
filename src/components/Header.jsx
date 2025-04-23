'use client'
import Image from "next/image";
import Link from "next/link";
import Burger from '@/icons/burger.svg'
import CloseBurger from '@/icons/colse-burger.svg'
import ProfileIcon from '@/icons/profile.svg'
import SearchIcon from '@/icons/search (4) 1.svg'
import BasketIcon from '../icons/shopping-cart 1.svg'
import HeartIcon from '../icons/favorite.svg'
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { carousel, navMenu } from "@/constants/constants";
import { AnimatePresence, motion } from "motion/react"
import ArrowIcon from '@/icons/arrow.svg'
import { useBasket } from "@/context/basket-context";
import { formatCurrency } from "@/utils/utils";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", '600', "700", '800', '900'],
    display: "swap",
});

export default function Header() {

    const pathName = usePathname();
    const isHomePage = pathName === '/uz' || pathName === '/ru';

    const { basket, totalPrice } = useBasket();
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    useEffect(() => {
        setIsOpenMenu(false);
    }, [pathName]);

    return (
        <header>
            {/* DESKTOP HEADER */}
            <nav className="nav py-6 border-b border-[#1E1E1EB2] bg-white hidden md:block">
                <div className="container">
                    <div className="flex items-center justify-between gap-x-12">
                        <div className="logo flex">
                            <Link href={'/'}>
                                <Image src={'/images/logo.png'} alt="Logo" width={182} height={40} className="h-auto" />
                            </Link>
                        </div>
                        <button
                            className="bg-primary text-white font-black p-3 rounded-base flex items-center gap-x-2.5"
                            onClick={toggleMenu}
                        >
                            {!isOpenMenu ? (<Burger />) : (<CloseBurger />)}
                            KATALOG
                        </button>
                        <form
                            className="flex-1 relative max-w-[464px]"
                            onSubmit={handleSearch}
                        >
                            <input
                                type="text"
                                placeholder="Nom bo’yicha izlash..."
                                className="bg-[#EFF3F6] w-full px-5 pr-20 outline-none rounded-base py-3"
                            />
                            <button
                                className="px-[17px] h-full rounded-r-base bg-primary absolute right-0"
                            >
                                <SearchIcon />
                            </button>
                        </form>
                        <div className="rightBox flex gap-x-10">
                            <Link href={'/admin'} className="box flex flex-col items-center justify-between">
                                <ProfileIcon />
                                <p className="font-black text-[15px] leading-none">Kirish</p>
                            </Link>
                            <Link href={'/favorites'} className="box flex flex-col items-center justify-between">
                                <HeartIcon />
                                <p className="font-black text-[15px] leading-none">Saralangan</p>
                            </Link>
                            <div className="box flex gap-x-5">
                                <Link href={'/basket'} className="relative p-3.5 bg-primary rounded-full">
                                    <BasketIcon className="text-white" />
                                    {basket.length > 0 && (
                                        <div className="absolute bg-orange text-white font-black w-[26px] h-[26px] rounded-full border-[3px] border-white flex items-center justify-center -top-2 -right-1.5">
                                            {basket.length}
                                        </div>
                                    )}
                                </Link>
                                <div className="box flex flex-col justify-between">
                                    <p className={`${montserrat.className} leading-none font-semibold text-[13px] text-[#484848]`}>
                                        Savatchangiz
                                    </p>
                                    <p className={`${montserrat.className} leading-none text-xl font-bold`}>
                                        {formatCurrency(totalPrice)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE HEADER */}
            <div className="md:hidden pt-4 bg-white container">
                {/* Верхняя часть: лого и иконки */}
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/images/logo.png" alt="Logo" width={140} height={30} />
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/admin"><ProfileIcon /></Link>
                        <Link href="/favorites"><HeartIcon /></Link>
                        <Link href="/basket" className="relative">
                            <BasketIcon className="text-primary" />
                            {basket.length > 0 && (
                                <div className="absolute -top-2 -right-2 bg-orange text-white text-xs rounded-full w-[20px] h-[20px] flex items-center justify-center">
                                    {basket.length}
                                </div>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Нижняя часть: поиск и каталог */}
                <div className="mt-4 flex gap-2">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Izlash..."
                            className="bg-[#EFF3F6] w-full px-4 pr-12 py-2 rounded-md"
                        />
                        <button type="submit" className="absolute right-0 rounded-r-md px-3 top-1/2 -translate-y-1/2 bg-primary h-full">
                            <SearchIcon />
                        </button>
                    </form>
                    <button
                        onClick={toggleMenu}
                        className="flex items-center justify-center px-3 py-2 bg-primary text-white rounded-md"
                    >
                        {!isOpenMenu ? <Burger /> : <CloseBurger />}
                    </button>
                </div>
            </div>

            {/* Общий каталог (для мобилки и десктопа) */}
            <div className="container catalog">
                <div className="relative">
                    <AnimatePresence initial={false}>
                        {isOpenMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute z-50 top-5 w-full h-auto grid md:grid-cols-5 items-center gap-2 bg-gray-100 p-6 rounded-3xl"
                            >
                                {navMenu.map((menu) => (
                                    <Link
                                        key={menu.id}
                                        href={menu.slug}
                                        className={`box flex items-center gap-x-3.5 px-3 py-[5px] h-10 rounded-base
                                        ${pathName === menu.slug ? 'bg-[#0000661A]' : 'hover:bg-[#0000661A]'}`}
                                    >
                                        <div className="relative w-full max-w-10 h-[30px]">
                                            <Image
                                                fill
                                                src={menu.img}
                                                alt={menu.name}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                        <p className="font-black text-black text-[15px] leading-none">
                                            {menu.name}
                                        </p>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Баннер на главной */}
            {isHomePage && (
                <div className="container relative">
                    <div className="navigationBox flex items-center md:gap-x-9 gap-x-5 absolute md:bottom-[30px] bottom-5 md:right-14 right-10 z-20">
                        <button className="swiper-button-prev-custom bg-white md:h-10 h-8 md:w-10 w-8 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
                            <ArrowIcon />
                        </button>
                        <button className="swiper-button-next-custom bg-white md:h-10 h-8 md:w-10 w-8 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">
                            <ArrowIcon className='rotate-180' />
                        </button>
                    </div>
                    <Swiper
                        className="mt-5 w-full h-[481px] rounded-[20px] overflow-hidden"
                        loop
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                        }}
                        spaceBetween={30}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        speed={1000}
                        simulateTouch={false}
                        modules={[Autoplay, Navigation]}
                    >
                        {carousel.map((item) => (
                            <SwiperSlide key={item.id} className="rounded-3xl overflow-hidden">
                                <Image
                                    fill
                                    src={item.img}
                                    alt={item.img}
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute top-0 left-0 bg-primary bg-opacity-55 w-full h-full"></div>
                                <div className="contentBox absolute bottom-20 left-4 md:left-24 text-white w-[90%] md:w-[803px]">
                                    <h1 className="font-black text-3xl md:text-5xl uppercase">{item.title}</h1>
                                    <h2 className="mt-3 font-semibold text-lg md:text-2xl">{item.subTitle}</h2>
                                    <div className="btnBox flex flex-col sm:flex-row items-start gap-3 md:gap-x-5 mt-6 md:mt-9">
                                        <button className="px-6 bg-orange rounded-md text-lg md:text-xl font-semibold h-[45px] md:h-[50px]">
                                            <Link href={item.slug}>Hozir xarid qiling</Link>
                                        </button>
                                        <button
                                            className="px-6 border rounded-md text-lg md:text-xl font-semibold h-[45px] md:h-[50px]"
                                            onClick={toggleMenu}
                                        >
                                            Katalogni ko‘rish
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </header>
    );
}