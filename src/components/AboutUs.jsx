'use client'
import CheckIcon from '@/icons/check 1.svg';
import Image from 'next/image';
import CarIcon from '@/icons/delivery-truck 1.svg';
import HeadPhonesIcon from '@/icons/headphones 1.svg';
import BagIcon from '@/icons/shopping-bag.svg';
import PackageIcon from '@/icons/package.svg';
import { Modal } from '@mui/material';
import { useState } from 'react';
import UzumLogo from '@/icons/uzumLogo.svg'
import Wildberries from '@/icons/wildberries.svg'
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneInTalkRounded';

const translations = {
    uz: {
        aboutTitle: 'Biz haqimizda',
        headline: 'VICALINA',
        description: `Vicalina brendiga 2002- yilda Xitoy Xalq Respublikasida asos solingan. Vicalinaning bosh ofislari Xitoyning Guanjou va Yiwu shaharlarida joylashgan. Vicalina brendi o‘zining Germaniya standartlariga mos yuqori sifati bilan ajralib turadi. Vicalina asosan zanglamaydigan po'lat va granit qoplamali idishlar ishlab chiqarish bilan shug‘ullanadi, bu esa uzoq muddatli foydalanish va qulaylikni kafolatlaydi. Ushbu brendning nafis va funksional dizayndagi mahsulotlari har qanday oshxonani bezatadi, taom tayyorlash jarayonini yoqimli va oson qiladi.

Vicalina – har bir taom tayyorlashni haqiqiy san’atga aylantiradigan brend! Yuqori sifatli qozonlar, pichoqlar, tovalar qulaylik, uslub va funksionallikni qadrlaydiganlar uchun yaratilgan. Vicalinaning mahsulot assortimentiga pichoqlar, qozonlar, tovalar kiradi. Vicalina sizning kulinariya tajribangizdan zavqlanishingiz uchun barcha narsalarni taqdim etadi.

Minglab mamnun mijozlar allaqachon Vicalina mahsulotlarining sifatini va qulayligini yuqori baholamoqda. Har bir ishlab chiqarish jarayoni inson omili va ilg‘or texnologiyalar ishtirokida amalga oshiriladi. Bu esa har bir mahsulotning mukammal va kamchiliklarsiz bo‘lishini ta’minlaydi.

Vicalina – siz va oilangiz uchun!`,
        checks: [
            'Yuqori sifatli materiallar',
            'Zamonaviy dizayn',
            'Ishonchli va uzoq muddatli foydalanish'
        ],
        ads: [
            { title: 'Uzum yoki Wildberries', subTitle: 'Uzum yoki Wildberries orqali buyurma berishingiz mumkin', but: true, slu: 'uzum' },
            { title: 'Aloqa yordam', subTitle: "Qo'llab-quvvatlash xizmatiga tezkor kirish", but: true, slu: 'nomer' },
            { title: "100% Xavfsiz to'lov", subTitle: "Pulingiz tejalishini kafolatlaymiz" },
            { title: 'Almashtirish imkoniyati', subTitle: "30 kun davomida sifatsiz mahsulotni qaytarib berish imkoniyati" }
        ]
    },
    ru: {
        aboutTitle: 'О нас',
        headline: 'VICALINA',
        description: `Бренд Vicalina был основан в 2002 году в Китайской Народной Республике. Главные офисы Vicalina расположены в городах Гуанчжоу и Иу. Бренд Vicalina отличается своим высоким качеством, соответствующим немецким стандартам. Основное направление компании — производство посуды из нержавеющей стали и с гранитным покрытием, что гарантирует долгий срок службы и удобство в использовании. Элегантные и функциональные изделия бренда Vicalina украшают любую кухню, делая процесс приготовления пищи приятным и легким.

Vicalina — бренд, который превращает приготовление пищи в настоящее искусство! Высококачественные кастрюли, ножи и сковороды созданы для тех, кто ценит удобство, стиль и функциональность. В ассортимент Vicalina входят ножи, кастрюли и сковороды. Vicalina предоставляет всё необходимое для того, чтобы вы получали удовольствие от своего кулинарного опыта.

Тысячи довольных клиентов уже высоко оценили качество и удобство продукции Vicalina. Каждый производственный процесс осуществляется с участием человеческого труда и передовых технологий, что обеспечивает безупречность и отсутствие недостатков в каждом продукте.

Vicalina — для вас и вашей семьи!`,
        checks: [
            'Высококачественные материалы',
            'Современный дизайн',
            'Надежное и долговечное использование'
        ],
        ads: [
            { title: 'Uzum или Wildberries', subTitle: 'Вы можете заказать через Uzum или Wildberries' },
            { title: 'Поддержка связи', subTitle: 'Быстрый доступ к службе поддержки' },
            { title: '100% Безопасная оплата', subTitle: 'Гарантируем сохранность ваших средств' },
            { title: 'Возможность обмена', subTitle: 'Возврат некачественного товара в течение 30 дней' }
        ]
    }
};

export default function AboutUs({ languageId }) {

    const t = Number(languageId) === 1 ? translations.uz : translations.ru;

    const [open, setOpen] = useState(false);
    const [openNum, setOpenNum] = useState(false);

    const handleClose = () => setOpen(false);
    const handleCloseNum = () => setOpenNum(false);

    return (
        <div className="aboutUs md:mt-[45px] mt-8">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="box flex md:flex-row flex-col items-center gap-5 bg-white p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                    <a
                        href="https://uzum.uz/ru/vicalina"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <UzumLogo className='w-72 h-16' />
                    </a>
                    <p className='hidden md:inline-block'>
                        |
                    </p>
                    <div className="box h-px w-full border md:hidden"></div>
                    <a
                        href="https://www.wildberries.ru/catalog/0/search.aspx?search=vicalina.uz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Wildberries />
                    </a>
                </div>
            </Modal>
            <Modal
                open={openNum}
                onClose={handleCloseNum}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="box flex items-center w-3/4 md:w-auto gap-x-5 bg-white p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                    <PhoneInTalkRoundedIcon />
                    <a
                        href="tel:+998555000098"
                        className='text-lg font-semibold'
                    >
                        +998 55 500 00 98
                    </a>
                </div>
            </Modal>
            <div className="container">
                <h3 className="font-semibold text-[40px] leading-tight">{t.aboutTitle}</h3>
            </div>
            <div className="box bg-[#F0F1F2] md:mt-[45px] mt-8 py-9">
                <div className="container">
                    <div className="flex flex-col md:flex-row gap-x-[45px] gap-y-5">
                        <div className="text md:w-[600px] flex flex-col gap-y-[26px]">
                            <h4 className="font-semibold text-2xl leading-tight text-[#484848] text-center">{t.headline}</h4>
                            <p className="leading-normal text-[#808080] whitespace-pre-line">{t.description}</p>
                            <div className="checkBox flex flex-col gap-y-[18px]">
                                {t.checks.map((info) => (
                                    <div key={info} className="box flex items-center gap-x-8">
                                        <div className="box bg-orange p-1 rounded-full">
                                            <CheckIcon />
                                        </div>
                                        <p className="leading-normal font-medium">{info}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="imgBox md:flex-1 md:h-auto h-96 relative flex justify-end">
                            <Image
                                src={'/images/company.png'}
                                fill
                                style={{ objectFit: 'contain' }}
                                alt='image'
                                className='rounded-[15px] overflow-hidden md:object-right object-bottom'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="adBox md:p-10 p-5 grid md:grid-cols-4 gap-3 border rounded-[20px] md:mt-[45px] mt-8">
                    {t.ads.map((item) => (
                        <div
                            key={item.title}
                            className="box flex items-center gap-x-4 hover:bg-orange hover:bg-opacity-30 rounded-lg transition-all duration-200 ease-in-out cursor-pointer"
                            onClick={() => item.but && item.slu === 'uzum' ? setOpen(true) :
                                item.but && item.slu === 'nomer' && setOpenNum(true)}
                        >
                            <div className="w-10 h-10">
                                {item.title.includes('Uzum') ? <CarIcon /> : item.title.includes('Поддержка') || item.title.includes('Aloqa') ? <HeadPhonesIcon /> : item.title.includes('to\'lov') || item.title.includes('оплата') ? <BagIcon /> : <PackageIcon />}
                            </div>
                            <div className="box flex flex-col gap-y-2 h-full">
                                <p
                                    className={`text-xl font-bold leading-normal`}
                                >
                                    {item.title}
                                </p>
                                <p className='text-sm leading-normal text-[#999]'>{item.subTitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};