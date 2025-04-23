import CheckIcon from '@/icons/check 1.svg';
import Image from 'next/image';
import CarIocn from '@/icons/delivery-truck 1.svg';
import HeadPhonesIcon from '@/icons/headphones 1.svg';
import BagIcon from '@/icons/shopping-bag.svg';
import PascageIcon from '@/icons/package.svg';

const checkInfo = [
    {
        icon: <CheckIcon />,
        info: 'Yuqori sifatli materiallar'
    },
    {
        icon: <CheckIcon />,
        info: 'Zamonaviy dizayn'
    },
    {
        icon: <CheckIcon />,
        info: 'Ishonchli va uzoq muddatli foydalanish'
    },
];

const adBox = [
    {
        icon: <CarIocn />,
        title: 'Uzum yoki Wildberries',
        subTitile: "Uzum yoki Wildberries orqali buyurma berishingiz mumkin"
    },
    {
        icon: <HeadPhonesIcon />,
        title: 'Aloqa yordam',
        subTitile: "Qo'llab-quvvatlash xizmatiga tezkor kirish"
    },
    {
        icon: <BagIcon />,
        title: "100% Xavfsiz to'lov",
        subTitile: "Pulingiz tejalishini kafolatlaymiz"
    },
    {
        icon: <PascageIcon />,
        title: 'Almashtirish imkoniyati',
        subTitile: "30 kun davomida sifatsiz mahsulotni qaytarib berish imkoniyati"
    },
];

export default function AboutUs() {
    return (
        <div className="aboutUs md:mt-[45px] mt-8">
            <div className="container">
                <h3 className="font-semibold text-[40px] leading-tight">
                    Biz haqimizda
                </h3>
            </div>
            <div className="box bg-[#F0F1F2] md:mt-[45px] mt-8 py-9">
                <div className="container">
                    <div className="flex flex-col md:flex-row gap-x-[45px] gap-y-5">
                        <div className="text md:w-[500px] flex flex-col gap-y-[26px]">
                            <h4 className="font-semibold text-xl leading-tight text-[#484848]">
                                VICALINA – 2002 yildan beri oshxona jihozlari ishlab chiqaruvchi ishonchli brend!
                            </h4>
                            <p className="leading-normal text-[#808080]">
                                Vicalina brendiga 2002- yilda Xitoy Xalq Respublikasida asos solingan. Vicalinaning bosh ofislari Xitoyning Guanjou va Yiwu shaharlarida joylashgan. Vicalina brendi o‘zining Germaniya standartlariga mos yuqori sifati bilan ajralib turadi. Vicalina asosan zanglamaydigan po'lat va granit qoplamali idishlar ishlab chiqarish bilan shug‘ullanadi, bu esa uzoq muddatli foydalanish va qulaylikni kafolatlaydi. Ushbu brendning nafis va funksional dizayndagi mahsulotlari har qanday oshxonani bezatadi, taom tayyorlash jarayonini yoqimli va oson qiladi. Vicalina – har bir taom tayyorlashni haqiqiy san’atga aylantiradigan brend! Yuqori sifatli qozonlar, pichoqlar, tovalar qulaylik, uslub va funksionallikni qadrlaydiganlar uchun yaratilgan. Vicalinaning mahsulot assortimentiga pichoqlar, qozonlar, tovalar va kiradi. Vicalina sizning kulinariya tajribangizdan zavqlanishingiz uchun barcha narsalarni taqdim etadi. Minglab mamnun mijozlar allaqachon Vicalina mahsulotlarining sifatini va qulayligini yuqori baholamoqda. Har bir ishlab chiqarish jarayoni inson omili va ilg‘or texnologiyalar ishtirokida amalga oshiriladi. Bu esa har bir mahsulotning mukammal va kamchiliklarsiz bo‘lishini ta’minlaydi.
                                <br />
                                <br />
                                Vicalina – siz va oilangiz uchun!
                            </p>
                            <div className="checkBox flex flex-col gap-y-[18px]">
                                {checkInfo.map((item) => (
                                    <div
                                        key={item.info}
                                        className="box flex items-center gap-x-8"
                                    >
                                        <div className="box bg-orange p-1 rounded-full">
                                            {item.icon}
                                        </div>
                                        <p className='leading-normal font-medium'>{item.info}</p>
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
                    {adBox.map((item) => (
                        <div
                            key={item.title}
                            className="box flex items-center gap-x-4"
                        >
                            <div className="w-10 h10">
                                {item.icon}
                            </div>
                            <div className="box flex flex-col gap-y-2 h-full">
                                <p className='text-xl font-bold leading-normal'>{item.title}</p>
                                <p className='text-sm leading-normal text-[#999]'>{item.subTitile}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}