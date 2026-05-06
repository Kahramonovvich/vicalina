'use client'
import { useState } from "react";
import UserICon from '@/icons/comUser.svg'
import RatingIcon from "./RatingIcon";
import { Rating } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { navMenu } from "@/constants/constants";

const translations = {
    uzb: {
        tabs: {
            description: "Tavsif",
            about: "Mahsulot haqida",
            feedback: "Mijozlar fikri",
        },
        weight: "Og'irligi:",
        color: "Rang:",
        type: "Turi:",
        catalog: "Katalog:",
        available: "Mavjud:",
        tags: "Teglar:",
        availableText: (qty) => qty > 0 ? `Mavjud (${qty})` : 'Tez orada',
        reviews: "Fikrlar",
        leaveReview: "Fikr qoldirish",
        name: "Ism Familiya",
        phone: "Tel raqam",
        rate: "Baholang",
        comment: "Fikr yozish",
        leaveButton: "Fikr qoldirish",
        seeMore: "Ko’proq ko’rish",
    },
    ru: {
        tabs: {
            description: "Описание",
            about: "О товаре",
            feedback: "Отзывы клиентов",
        },
        weight: "Вес:",
        color: "Цвет:",
        type: "Тип:",
        catalog: "Каталог:",
        available: "Наличие:",
        tags: "Теги:",
        availableText: (qty) => qty > 0 ? `В наличии (${qty})` : 'Скоро поступит',
        reviews: "Отзывы",
        leaveReview: "Оставить отзыв",
        name: "Имя и Фамилия",
        phone: "Телефон",
        rate: "Оцените",
        comment: "Ваш отзыв",
        leaveButton: "Оставить отзыв",
        seeMore: "Показать больше",
    }
};

export default function ProductInfoComponents({ product, languageId }) {

    const t = languageId === "uzb" ? translations.uzb : translations.ru;

    const [activeComponent, setActiveComponent] = useState(t.tabs.description);
    const [value, setValue] = useState(0);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [text, setText] = useState('');

    const createComment = async (e) => {
        e.preventDefault();

        const comment = {
            productId: product.id,
            fullName,
            phoneNumber,
            text
        };

        if (Number(value) === 0) {
            alert('Iltimos, mahsulotni baholang!');
            return;
        } else if (comment.fullName.length <= 0) {
            alert('Iltimos, ismingizni yozing!');
            return;
        } else if (comment.phoneNumber.length <= 0) {
            alert('Iltimos, raqamingizni yozing!');
            return;
        } else if (comment.text.length <= 0) {
            alert('Iltimos, izoh yozing!');
            return;
        };

        try {
            const resRat = await fetch(`/api/Rating/CalculateRating?rating=${value}&productId=${product.id}`, {
                method: 'POST',
            });

            const resCom = await fetch('/api/Comment/Create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment),
            });

            if (!resRat.ok || !resCom.ok) {
                const errorRat = await resRat.text();
                const errorCom = await resCom.text();
                console.error('❌ Rating error:', resRat.status, errorRat);
                console.error('❌ Comment error:', resCom.status, errorCom);
                alert('Izoh qo‘shishda xatolik');
                return;
            }
            alert('✅ Izoh muvaffaqiyatli saqlandi!');
        } catch (error) {
            console.error('💥 Server bilan muammo:', error);
            alert('Server bilan ulanishda xatolik');
        };
    };

    return (
        <div className="box">
            <div className="border-b mb-8">
                <div className="container">
                    <div className="top flex items-center justify-center">
                        <button
                            onClick={() => setActiveComponent(t.tabs.description)}
                            className={`text-[#808080] font-medium leading-normal p-4
                                ${activeComponent === t.tabs.description ? 'border-b-2 border-primary' : ''}`}
                        >
                            {t.tabs.description}
                        </button>
                        <button
                            onClick={() => setActiveComponent(t.tabs.about)}
                            className={`text-[#808080] font-medium leading-normal p-4
                                ${activeComponent === t.tabs.about ? 'border-b-2 border-primary' : ''}`}
                        >
                            {t.tabs.about}
                        </button>
                        <button
                            onClick={() => setActiveComponent(t.tabs.feedback)}
                            className={`text-[#808080] font-medium leading-normal p-4
                                ${activeComponent === t.tabs.feedback ? 'border-b-2 border-primary' : ''}`}
                        >
                            {t.tabs.feedback}
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="bottom">
                    {activeComponent === t.tabs.description && (
                        <div className="box leading-normal text-sm text-[#808080]">
                            {product.description}
                        </div>
                    )}
                    {activeComponent === t.tabs.about && (
                        <div className="box flex">
                            <div className="box w-28">
                                <p className="text-sm leading-normal">{t.weight}</p>
                                <p className="text-sm leading-normal">{t.color}</p>
                                <p className="text-sm leading-normal">{t.type}</p>
                                <p className="text-sm leading-normal">{t.catalog}</p>
                                <p className="text-sm leading-normal">{t.available}</p>
                                <p className="text-sm leading-normal">{t.tags}</p>
                            </div>
                            <div className="box">
                                <p className="text-sm leading-normal text-[#666666]">{product.weight}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.color}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.type}</p>
                                <p className="text-sm leading-normal text-[#666666]">
                                    {(() => {
                                        const category = navMenu.find((cat) => cat.name === product.category);

                                        return category ? (
                                            languageId === "uzb" ?
                                                category.name?.charAt(0).toUpperCase() + category.name?.slice(1).toLowerCase() :
                                                category.nameRu?.charAt(0).toUpperCase() + category.nameRu?.slice(1).toLowerCase() 
                                        ) : "";
                                    })()}
                                </p>
                                <p className="text-sm leading-normal text-[#666666]">{t.availableText(product.qty)}</p>
                                <p className="text-sm leading-normal text-[#666666]">{product.tags}</p>
                            </div>
                        </div>
                    )}
                    {activeComponent === t.tabs.feedback && (
                        <div className="box md:grid grid-cols-5 gap-x-10">
                            <div className="col-span-3">
                                <div className="top mb-4">
                                    <h3 className="font-medium leading-normal text-2xl">
                                        {t.reviews}
                                    </h3>
                                </div>
                                {product.comments.slice(0, 5).map((com, index) => (
                                    <div
                                        key={index}
                                        className="box pb-5 mb-5 border-b"
                                    >
                                        <div className="top flex gap-x-3">
                                            <UserICon />
                                            <div className="box">
                                                <p className="text-sm font-medium leading-normal">{com.fullName}</p>
                                                <RatingIcon
                                                    value={com.clientRate}
                                                    className='!text-base !text-orange'
                                                />
                                            </div>
                                        </div>
                                        <div className="bottom mt-3 text-sm leading-normal text-[#808080]">
                                            {com.text}
                                        </div>
                                    </div>
                                ))}
                                {product.comments.length > 5 && (
                                    <button className="text-primary py-3.5 border-2 border-primary w-full rounded text-sm font-semibold leading-tight">
                                        {t.seeMore}
                                    </button>
                                )}
                            </div>
                            <div className="box col-span-2 mt-5 md:mt-0">
                                <div className="top mb-4">
                                    <h3 className="font-medium leading-normal text-2xl">
                                        {t.leaveReview}
                                    </h3>
                                </div>
                                <form
                                    className="space-y-4"
                                    onSubmit={createComment}
                                >
                                    <div>
                                        <label className="block text-sm mb-1">{t.name}</label>
                                        <input
                                            value={fullName}
                                            type="text"
                                            placeholder={t.name}
                                            className="w-full border rounded px-4 py-2"
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">{t.phone}</label>
                                        <input
                                            value={phoneNumber}
                                            type="tel"
                                            placeholder="+998 99 000 00 00"
                                            className="w-full border-2 border-indigo-900 rounded px-4 py-2"
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">{t.rate}</label>
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            icon={<StarRoundedIcon className='!text-xl !text-orange' />}
                                            emptyIcon={<StarBorderRoundedIcon className='!text-xl !text-orange' />}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">{t.comment}</label>
                                        <textarea
                                            value={text}
                                            placeholder="..."
                                            className="w-full border rounded px-4 py-2"
                                            rows="4"
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-indigo-900 text-white px-6 py-2 rounded hover:bg-indigo-800 transition"
                                    >
                                        {t.leaveButton}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};