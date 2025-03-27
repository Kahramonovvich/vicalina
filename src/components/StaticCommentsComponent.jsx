'use client'
import { comments } from '@/constants/constants';
import Strelka from '@/icons/strelka.svg'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Icon from '@/icons/comIcon.svg'
import Image from 'next/image';
import RatingIcon from './RatingIcon';

export default function StaticCommentsComponent() {
    return (
        <div className="staticCommentsComponent mt-[45px] p-[60px] bg-[#F2F2F2]">
            <div className="container">
                <div className="box flex items-center justify-between mb-8">
                    <h3 className="sectionTop">
                        Mijozlar nima deydi?
                    </h3>
                    <div className="arrowBox flex gap-x-3">
                        <button
                            className="box w-11 h-11 flex items-center justify-center border rounded-full bg-white rotate-180 text-[#1A1A1A]
                                hover:bg-primary hover:!text-white transition-all duration-300 ease-in-out swiper-button-prev-custom"
                        >
                            <Strelka />
                        </button>
                        <button
                            className="box w-11 h-11 flex items-center justify-center border rounded-full bg-white text-[#1A1A1A]
                                hover:bg-primary hover:!text-white transition-all duration-300 ease-in-out swiper-button-next-custom"
                        >
                            <Strelka />
                        </button>
                    </div>
                </div>
                <div className="comments h-56">
                    <Swiper
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        speed={800}
                        spaceBetween={24}
                        slidesPerView={3}
                        loop={true}
                        slidesPerGroup={3}
                        loopAddBlankSlides={false}
                        className='h-full'
                        modules={[Navigation]}
                    >
                        {comments.map((com) => (
                            <SwiperSlide
                                key={com.id}
                            >
                                <div className="h-full w-full bg-white rounded-lg p-6 flex flex-col justify-between gap-y-4">
                                    <div className="icon">
                                        <Icon />
                                    </div>
                                    <div className="text">
                                        <p className='text-sm text-[#4D4D4D] leading-normal'>
                                            {com.comment}
                                        </p>
                                    </div>
                                    <div className="box flex items-center justify-between">
                                        <div className="left flex items-center gap-x-3">
                                            <div className="imgBox w-14 h-14 relative">
                                                <Image
                                                    fill
                                                    src={com.img}
                                                    alt={com.userName}
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div className="text">
                                                <p className='font-medium leading-normal text-[#1A1A1A]'>
                                                    {com.userName}
                                                </p>
                                                <p className='text-sm leading-normal text-[#999]'>
                                                    Mijoz
                                                </p>
                                            </div>
                                        </div>
                                        <div className="right flex items-center">
                                            <RatingIcon
                                                value={5}
                                                className={'!text-xl !text-orange'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};