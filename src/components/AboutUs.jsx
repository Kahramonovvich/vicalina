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
        title: 'Bepul yetkazib berish',
        subTitile: "Barcha buyurtmalaringiz uchun bepul yetkazib berish"
    },
    {
        icon: <HeadPhonesIcon />,
        title: 'Aloqa yordam 24/7',
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
        <div className="aboutUs mt-[45px]">
            <div className="container">
                <h3 className="font-semibold text-[40px] leading-tight">
                    Biz haqimizda
                </h3>
            </div>
            <div className="box bg-[#F0F1F2] mt-[45px] py-9">
                <div className="container">
                    <div className="flex gap-x-[45px]">
                        <div className="text w-[500px] flex flex-col gap-y-[26px]">
                            <h4 className="font-semibold text-xl leading-tight text-[#484848]">
                                VICALINA – 2019 yildan beri oshxona jihozlari
                                <br />
                                ishlab chiqaruvchi ishonchli brend!
                            </h4>
                            <p className="leading-normal text-[#808080]">
                                Bizning maqsadimiz – har bir uy bekasiga va oshpazga pishirish jarayonini yanada qulay va yoqimli qilish.
                                VICALINA mahsulotlari zamonaviy texnologiyalar asosida ishlab chiqarilib, mustahkamlik
                                <br />
                                va uzoq xizmat qilish kafolatlanadi.
                                <br />
                                Mahsulotlarimiz orasida quyma alyuminiy idishlar, mustahkam qoplamali skovorodkalar, pichoqlar hamda boshqa oshxona anjomlari mavjud.
                                Sifat va innovatsiyalarni birlashtirib, mijozlarimizga eng yaxshi tajribani taqdim etamiz.
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
                        <div className="imgBox flex-1 grid grid-cols-2 gap-x-14 h-[470px]">
                            <div className="img relative">
                                <Image
                                    src={'/images/company-1.png'}
                                    fill
                                    style={{ objectFit: 'fill' }}
                                    alt='image'
                                    className='rounded-[15px] overflow-hidden'
                                />
                            </div>
                            <div className="img relative">
                                <Image
                                    src={'/images/company-2.png'}
                                    fill
                                    style={{ objectFit: 'fill' }}
                                    alt='image'
                                    className='rounded-[15px] overflow-hidden'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="adBox p-10 grid grid-cols-4 gap-x-3 border rounded-[20px] mt-[45px]">
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
