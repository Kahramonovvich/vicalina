'use client'
import { useState } from "react";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

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

const footerMenu = [
    {
        id: 1,
        top: 'Kompaniya',
        items: [
            { item: 'Kompaniya haqida' },
            { item: 'Sertifikatlar' },
            { item: 'Sharxlar' },
        ]
    },
    {
        id: 2,
        top: 'Yordam',
        items: [
            { item: 'Faqs' },
            { item: 'Terms & Condition' },
            { item: 'Privacy Policy' },
        ]
    },
];

export default function Footer() {

    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <footer className="mt-[45px]">
            <div className="top bg-[#F7F7F7] py-10">
                <div className="container">
                    <div className="flex items-center justify-between gap-x-[58px]">
                        <div className="text w-[455p">
                            <p className="font-semibold text-2xl leading-normal">
                                Ijtimoiy tarmoqlarimizga obuna bo’ling!
                            </p>
                            <p className="text-sm leading-normal text-[#999999]">
                                Bizdagi yangiliklarni ijtioiy tarmoqlarda bilib oling va eng
                                <br />
                                birinchilardan bo’ling!
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex-1 relative"
                        >
                            <input
                                type="text"
                                className="px-6 py-3.5 pr-44 w-full rounded-full outline-none border"
                                placeholder="Raqamingiz..."
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9+]/g, ""))}
                                maxLength={13}
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center bg-primary font-semibold text-white leading-5 absolute top-0 right-0 h-full rounded-full px-10"
                            >
                                Bog’lanish
                            </button>
                        </form>
                        <div className="socialBox flex items-center gap-x-2">
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
                    <div className="flex items-center justify-between">
                        <div className="left w-[340px] flex flex-col gap-y-4">
                            <div className="logo">
                                <Link
                                    href={'/'}
                                >
                                    <Image
                                        src={'/images/footerLogo.png'}
                                        width={182}
                                        height={50}
                                        alt="footer-logo.png"
                                    />
                                </Link>
                            </div>
                            <p className="leading-normal text-[#808080]">
                                Bizning maqsadimiz – har bir uy bekasiga va oshpazga pishirish jarayonini yanada qulay va yoqimli qilish.
                            </p>
                            <div className="text-white flex items-center gap-x-4">
                                <a
                                    href="tel:+998990300000"
                                    className="py-1.5 border-b-2 text-sm leading-normal font-medium"
                                >
                                    +998 99 030-00-00
                                </a>
                                <span className="text-[#808080] leading-normal">or</span>
                                <a
                                    href="mailto:@vicalina"
                                    className="py-1.5 border-b-2 text-sm leading-normal font-medium"
                                >
                                    @vicalina
                                </a>
                            </div>
                        </div>
                        <div className="right flex gap-x-[102px]">
                            {footerMenu.map((menu) => (
                                <ul key={menu.id}>
                                    <p
                                        className="font-medium leading-normal text-white mb-5"
                                    >
                                        {menu.top}
                                    </p>
                                    {menu.items.map(el => (
                                        <li
                                            key={el.item}
                                            className="mb-3 last-of-type:mb-0"
                                        >
                                            <p className="text-sm leading-normal text-[#999999] hover:text-white cursor-pointer">{el.item}</p>
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
};