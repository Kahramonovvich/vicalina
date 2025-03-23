'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import LentaIcon from '@/icons/lenta.svg';
import MaksidomIcon from '@/icons/maksidom.svg';
import MegastroyIcon from '@/icons/megastroy.svg';
import OkeyIcon from '@/icons/okey.svg';
import TexmatketIcon from '@/icons/texmarket.svg';

const partners = [
    <LentaIcon />,
    <MaksidomIcon />,
    <MegastroyIcon />,
    <OkeyIcon />,
    <TexmatketIcon />,
];

export default function OurPartners() {
    return (
        <div className="ourPartners mt-[45px]">
            <div className="container">
                <h3 className="sectionTop mb-[45px]">
                    Bizning hamkorlarimiz
                </h3>
                <div
                    className="box py-[34px] border rounded-[15px] overflow-hidden"
                >
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={100}
                        slidesPerView={5}
                        loop={true}
                        speed={2000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false
                        }}
                        allowTouchMove={false}
                        className="partners-carousel"
                    >
                        {partners.concat(partners).map((logo, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex justify-center items-center"
                            >
                                {logo}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}