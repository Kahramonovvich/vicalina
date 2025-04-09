'use client'
import { navMenu } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from '@/icons/arrow.svg'
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function Categorys() {
    return (
        <div className="category md:mt-[45px] mt-8">
            <div className="container">
                <h3 className="sectionTop md:mb-[45px] mb-8">
                    Ommabop toifalar
                </h3>
                <div className="catBox relative bg-[#F0F1F2] rounded-[15px]">
                    <button
                        className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-5 z-20 bg-primary 
                            h-10 w-10 flex items-center justify-center rounded-full text-white"
                    >
                        <ArrowIcon />
                    </button>
                    <button
                        className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-5 z-20 bg-primary 
                            h-10 w-10 flex items-center justify-center rounded-full text-white"
                    >
                        <ArrowIcon className='rotate-180 ' />
                    </button>
                    <Swiper
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        speed={800}
                        spaceBetween={0}
                        slidesPerView={5}
                        loop={true}
                        slidesPerGroup={5}
                        loopAddBlankSlides={false}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                            },
                            1280: {
                                slidesPerView: 5,
                                slidesPerGroup: 5,
                            },
                        }}
                        modules={[Navigation]}
                    >
                        {navMenu.map((menu) => (
                            <SwiperSlide key={menu.id}>
                                <div className="box flex flex-col items-center gap-y-5 py-[32px]">
                                    <div className="img relative w-full max-w-[60px] h-[60px]">
                                        <Image
                                            fill
                                            src={menu.img}
                                            alt={menu.name}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                    <Link
                                        href={menu.slug}
                                        className="text-xl text-center hover:text-primary"
                                    >
                                        {menu.name}
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}