'use client'
import { useState } from "react";
import { FaTiktok, FaYoutube, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const translations = {
    uz: {
        subscribe: "Ijtimoiy tarmoqlarimizga obuna bo’ling!",
        follow: "Bizdagi yangiliklarni ijtioiy tarmoqlarda bilib oling va eng birinchilardan bo’ling!",
        phonePlaceholder: "Raqamingiz...",
        connect: "Bog’lanish",
        goal: "Bizning maqsadimiz – har bir uy bekasiga va oshpazga pishirish jarayonini yanada qulay va yoqimli qilish.",
        or: "yoki",
        company: "Kompaniya",
        aboutCompany: "Kompaniya haqida",
        certificates: "Sertifikatlar",
        reviews: "Sharxlar",
        help: "Yordam",
        faqs: "Faqs",
        terms: "Terms & Condition",
        privacy: "Privacy Policy"
    },
    ru: {
        subscribe: "Подпишитесь на наши соцсети!",
        follow: "Следите за нашими новостями в соцсетях и будьте в числе первых!",
        phonePlaceholder: "Ваш номер...",
        connect: "Связаться",
        goal: "Наша цель – сделать процесс приготовления еды ещё удобнее и приятнее для каждой хозяйки и повара.",
        or: "или",
        company: "Компания",
        aboutCompany: "О компании",
        certificates: "Сертификаты",
        reviews: "Отзывы",
        help: "Помощь",
        faqs: "Вопросы и ответы",
        terms: "Terms & Condition",
        privacy: "Политика конфиденциальности"
    }
};

export default function Footer({ languageId }) {
    const t = Number(languageId) === 1 ? translations.uz : translations.ru;

    const footerMenu = [
        {
            id: 1,
            top: t.company,
            items: [
                { item: t.aboutCompany },
                { item: t.certificates },
                { item: t.reviews },
            ]
        },
        {
            id: 2,
            top: t.help,
            items: [
                { item: t.faqs },
                { item: t.terms },
                { item: t.privacy },
            ]
        },
    ];

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <footer className="md:mt-[45px] mt-8">
            <div className="top bg-[#F7F7F7] py-10">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-6 md:gap-y-0 gap-x-[58px]">
                        <div className="text">
                            <p className="font-semibold text-2xl leading-normal">
                                {t.subscribe}
                            </p>
                            <p className="text-sm leading-normal text-[#999999]">
                                {t.follow}
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="w-full md:flex-1 relative"
                        >
                            <input
                                type="text"
                                className="px-6 py-3.5 pr-44 w-full rounded-full outline-none border"
                                placeholder={t.phonePlaceholder}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g, ""))}
                                maxLength={13}
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center bg-primary font-semibold text-white leading-5 absolute top-0 right-0 h-full rounded-full px-10"
                            >
                                {t.connect}
                            </button>
                        </form>

                        <div className="socialBox flex items-center gap-2 md:gap-x-2 mt-4 md:mt-0">
                            {socialMedia.map((icon) => (
                                <a
                                    key={icon.name}
                                    href={icon.href}
                                    target='_blank'
                                    className="box w-10 h-10 flex items-center justify-center
                                        hover:bg-primary hover:text-white rounded-full text-lg transition-all duration-200 ease-in-out"
                                >
                                    {icon.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom bg-primary py-[60px]">
                <div className="container">
                    <div className="flex flex-col md:items-center md:flex-row justify-between gap-y-10">
                        <div className="left w-full md:w-[340px] flex flex-col gap-y-4">
                            <div className="logo">
                                <Link href={'/'}>
                                    <Image
                                        src={'/images/footerLogo.png'}
                                        width={182}
                                        height={50}
                                        alt="footer-logo.png"
                                    />
                                </Link>
                            </div>
                            <p className="leading-normal text-[#808080] text-sm md:text-base">
                                {t.goal}
                            </p>
                            <div className="text-white flex flex-wrap items-center gap-x-4 gap-y-2">
                                <a
                                    href="tel:+998555000098"
                                    className="py-1.5 border-b-2 text-sm leading-normal font-medium"
                                >
                                    +998 55 500-00-98
                                </a>
                                {/* <span className="text-[#808080] leading-normal">{t.or}</span>
                                <a
                                    href="mailto:@vicalina"
                                    className="py-1.5 border-b-2 text-sm leading-normal font-medium"
                                >
                                    @vicalina
                                </a> */}
                            </div>
                        </div>

                        <div className="right flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-[102px]">
                            {footerMenu.map((menu) => (
                                <ul key={menu.id}>
                                    <p className="font-medium leading-normal text-white mb-5">
                                        {menu.top}
                                    </p>
                                    {menu.items.map(el => (
                                        <li key={el.item} className="mb-3 last-of-type:mb-0">
                                            <p className="text-sm leading-normal text-[#999999] hover:text-white cursor-pointer">
                                                {el.item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const socialMedia = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/vicalina.uz/',
        icon: <FaInstagram />
    },
    {
        name: 'Telegram',
        href: 'https://t.me/VicalinaOfficial',
        icon: <FaTelegramPlane />
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/@Vicalina_2009',
        icon: <FaYoutube />
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@vicalina.uz',
        icon: <FaTiktok />
    },
];
