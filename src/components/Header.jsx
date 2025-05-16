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
import { useEffect, useMemo, useState } from "react";
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
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", '600', "700", '800', '900'],
    display: "swap",
});

const translations = {
    uz: {
        searchPlaceholder: "Nom bo’yicha izlash...",
        login: "Kirish",
        favorites: "Saralangan",
        basket: "Savatchangiz",
        slogan: "Siz va oilangiz uchun!",
        catalog: "KATALOG",
        searchMobile: "Izlash...",
        href: 'uz'
    },
    ru: {
        searchPlaceholder: "Поиск по названию...",
        login: "Войти",
        favorites: "Избранное",
        basket: "Ваша корзина",
        slogan: "Для вас и вашей семьи!",
        catalog: "КАТАЛОГ",
        searchMobile: "Поиск...",
        href: 'ru'
    }
};

export default function Header({ languageId, products }) {

    const t = Number(languageId) === 1 ? translations.uz : translations.ru;
    const pathName = usePathname();
    const isHomePage = pathName === '/uz' || pathName === '/ru';

    const { basket, totalPrice } = useBasket();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(Number(languageId) === 1 ? 'UZ' : 'RU');
    const [openLang, setOpenLang] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const filteredProducts = useMemo(() => {
        if (searchTerm) {
            return products?.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    }, [products, searchTerm]);

    useEffect(() => {
        setIsOpenMenu(false);
        setSearchTerm('');
    }, [pathName]);

    return (
        <header>
            {/* DESKTOP HEADER */}
            <nav className="nav py-6 border-b border-[#1E1E1EB2] bg-white hidden md:block">
                <div className="container">
                    <div className="flex items-center justify-between gap-x-12">
                        <div className="logo flex">
                            <Link href={`/${Number(languageId) === 1 ? 'uz' : 'ru'}`} className="flex flex-col items-center">
                                <Image src={'/images/logo.png'} alt="Logo" width={182} height={40} className="h-auto" />
                                <p className="font-semibold text-[12px]">{t.slogan}</p>
                            </Link>
                        </div>
                        <button className="bg-primary text-white font-black p-3 rounded-base flex items-center gap-x-2.5" onClick={toggleMenu}>
                            {!isOpenMenu ? (<Burger />) : (<CloseBurger />)}
                            {t.catalog}
                        </button>
                        <form className="flex-1 relative max-w-[464px]" onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchTerm}
                                placeholder={t.searchPlaceholder}
                                className="bg-[#EFF3F6] w-full px-5 pr-20 outline-none rounded-base py-3"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="px-[17px] h-full rounded-r-base bg-primary absolute right-0">
                                <SearchIcon />
                            </button>
                            {searchTerm.length > 0 && (
                                <div className="box absolute w-full border mt-3 rounded-lg top-full p-3 bg-white z-40 flex flex-col gap-y-2">
                                    {filteredProducts.length > 0 ?
                                        filteredProducts
                                            .slice(0, 5)
                                            .map((product) => (
                                                <Link
                                                    key={product.id}
                                                    href={`/${t.href}${product.slug}`}
                                                    className="flex items-center justify-between gap-x-2 p-2 hover:bg-gray-100 rounded-md border"
                                                    onClick={() => setSearchTerm('')}
                                                >
                                                    <div className="img relative w-14 h-14">
                                                        <Image
                                                            fill
                                                            src={product.images[0].filePath}
                                                            alt={product.name}
                                                            style={{ objectFit: 'contain' }}
                                                        />
                                                    </div>
                                                    <div className="font-semibold truncate flex-1">
                                                        {product.name} - {product.shortDescription}
                                                    </div>
                                                    <p className="font-semibold">
                                                        {formatCurrency(product.discount ? product.newPrice : product.price)}
                                                    </p>
                                                </Link>
                                            )) :
                                        'Mahsulot topilmadi'
                                    }
                                </div>
                            )}
                        </form>
                        <div className="rightBox flex gap-x-5">
                            <Link href={`/${t.href}/admin`} className="box flex flex-col items-center justify-between">
                                <ProfileIcon />
                                <p className="font-black text-[15px] leading-none">{t.login}</p>
                            </Link>
                            <Link href={`/${t.href}/favorites`} className="box flex flex-col items-center justify-between">
                                <HeartIcon />
                                <p className="font-black text-[15px] leading-none">{t.favorites}</p>
                            </Link>
                            <div className="box flex gap-x-5">
                                <Link href={`/${t.href}/basket`} className="relative p-3.5 bg-primary rounded-full">
                                    <BasketIcon className="text-white" />
                                    {basket.length > 0 && (
                                        <div className="absolute bg-orange text-white font-black w-[26px] h-[26px] rounded-full border-[3px] border-white flex items-center justify-center -top-2 -right-1.5">
                                            {basket.length}
                                        </div>
                                    )}
                                </Link>
                                <div className="box flex flex-col justify-between">
                                    <p className={`${montserrat.className} leading-none font-semibold text-[13px] text-[#484848]`}>
                                        {t.basket}
                                    </p>
                                    <p className={`${montserrat.className} leading-none text-xl font-bold`}>
                                        {formatCurrency(totalPrice)}
                                    </p>
                                </div>
                            </div>
                            <div className="box flex items-center relative">
                                <button className="font-bold flex items-center" onClick={() => setOpenLang(!openLang)}>
                                    {selectedLanguage}
                                    <ArrowDropDownRoundedIcon />
                                </button>
                                {openLang && (
                                    <div className="box bg-primary w-full flex flex-col z-50 absolute text-white top-full right-1/2 translate-x-1/2">
                                        <Link
                                            href={pathName.replace(/^\/(uz|ru)/, '/uz')}
                                            className="font-bold text-center py-1 border-b hover:bg-slate-600 transition-all ease-in-out duration-200"
                                            onClick={() => { setOpenLang(false); setSelectedLanguage('UZ'); }}
                                        >
                                            UZ
                                        </Link>
                                        <Link
                                            href={pathName.replace(/^\/(uz|ru)/, '/ru')}
                                            className="font-bold text-center py-1 hover:bg-slate-600 transition-all ease-in-out duration-200"
                                            onClick={() => { setOpenLang(false); setSelectedLanguage('RU'); }}
                                        >
                                            RU
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE HEADER */}
            <div className="md:hidden pt-4 bg-white container">
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
                        <div className="box flex items-center relative">
                            <button className="font-bold flex items-center" onClick={() => setOpenLang(!openLang)}>
                                {selectedLanguage}
                                <ArrowDropDownRoundedIcon />
                            </button>
                            {openLang && (
                                <div className="box bg-primary w-full flex flex-col z-50 absolute text-white top-full right-1/2 translate-x-1/2">
                                    <Link
                                        href={pathName.replace(/^\/(uz|ru)/, '/uz')}
                                        className="font-bold text-center py-1 border-b hover:bg-slate-600 transition-all ease-in-out duration-200"
                                        onClick={() => { setOpenLang(false); setSelectedLanguage('UZ'); }}
                                    >
                                        UZ
                                    </Link>
                                    <Link
                                        href={pathName.replace(/^\/(uz|ru)/, '/ru')}
                                        className="font-bold text-center py-1 hover:bg-slate-600 transition-all ease-in-out duration-200"
                                        onClick={() => { setOpenLang(false); setSelectedLanguage('RU'); }}
                                    >
                                        RU
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex gap-2 relative">
                    <form onSubmit={handleSearch} className="flex-1 relative">
                        <input
                            type="text"
                            placeholder={t.searchMobile}
                            className="bg-[#EFF3F6] w-full px-4 pr-12 py-2 rounded-md"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-0 rounded-r-md px-3 top-1/2 -translate-y-1/2 bg-primary h-full">
                            <SearchIcon />
                        </button>
                    </form>
                    {searchTerm.length > 0 && (
                        <div className="box absolute w-full border mt-3 rounded-lg top-full p-3 bg-white z-40 flex flex-col gap-y-2">
                            {filteredProducts.length > 0 ?
                                filteredProducts
                                    .slice(0, 5)
                                    .map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/${t.href}${product.slug}`}
                                            className="flex items-center justify-between gap-x-2 p-2 hover:bg-gray-100 rounded-md border"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <div className="img relative w-14 h-14">
                                                <Image
                                                    fill
                                                    src={product.images[0].filePath}
                                                    alt={product.name}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div className="font-semibold truncate flex-1">
                                                {product.name}
                                            </div>
                                            <p className="font-semibold">
                                                {formatCurrency(product.discount ? product.newPrice : product.price)}
                                            </p>
                                        </Link>
                                    )) :
                                'Mahsulot topilmadi'
                            }
                        </div>
                    )}
                    <button onClick={toggleMenu} className="flex items-center justify-center px-3 py-2 bg-primary text-white rounded-md">
                        {!isOpenMenu ? <Burger /> : <CloseBurger />}
                    </button>
                </div>
            </div>

            {/* КАТАЛОГ */}
            <div className="container catalog">
                <div className="relative">
                    <AnimatePresence initial={false}>
                        {isOpenMenu && (
                            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="absolute z-50 top-5 w-full h-auto grid md:grid-cols-5 items-center gap-2 bg-gray-100 p-6 rounded-3xl">
                                {navMenu.map((menu) => (
                                    <Link
                                        key={menu.id}
                                        href={Number(languageId) === 1 ? `/uz${menu.slug}` : `/ru${menu.slug}`}
                                        className={`box flex items-center gap-x-3.5 px-3 py-[5px] h-10 rounded-base 
                                            ${pathName === menu.slug ? 'bg-[#0000661A]' : 'hover:bg-[#0000661A]'}`}
                                    >
                                        <div className="relative w-full max-w-10 h-[30px]">
                                            <Image fill src={menu.img} alt={menu.name} style={{ objectFit: 'contain' }} />
                                        </div>
                                        <p className="font-black text-black text-[15px] leading-none">
                                            {Number(languageId) === 1 ? menu.name : menu.nameRu}
                                        </p>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* БАННЕР */}
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
                        className="mt-5 w-full rounded-[20px] overflow-hidden"
                        loop
                        autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                        spaceBetween={30}
                        navigation={{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }}
                        speed={1000} simulateTouch={false} modules={[Autoplay, Navigation]}
                    >
                        {carousel.map((item) => (
                            <SwiperSlide key={item.id} className="rounded-3xl overflow-hidden">
                                <div className="img relative w-full aspect-[2.75/1]">
                                    <Image
                                        fill
                                        src={item.img}
                                        alt={item.img}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="contentBox absolute bottom-20 left-4 md:left-24 text-white w-[90%] md:w-[803px] hidden">
                                    <h1 className="font-black text-3xl md:text-5xl uppercase">
                                        {Number(languageId) === 1 ? item.title : item.titleRu}
                                    </h1>
                                    <h2 className="mt-3 font-semibold text-lg md:text-2xl">
                                        {Number(languageId) === 1 ? item.subTitle : item.subTitleRu}
                                    </h2>
                                    {/* <div className="btnBox flex flex-col sm:flex-row items-start gap-3 md:gap-x-5 mt-6 md:mt-9">
                                        <button className="px-6 bg-orange rounded-md text-lg md:text-xl font-semibold h-[45px] md:h-[50px]">
                                            <Link
                                                href={Number(languageId) === 1 ? `uz${item.slug}` : `ru${item.slug}`}
                                            >
                                                {t.buyNow}
                                            </Link>
                                        </button>
                                        <button className="px-6 border rounded-md text-lg md:text-xl font-semibold h-[45px] md:h-[50px]" onClick={toggleMenu}>
                                            {t.viewCatalog}
                                        </button>
                                    </div> */}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </header>
    );
}
