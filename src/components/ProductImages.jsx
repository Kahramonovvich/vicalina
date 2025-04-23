'use client'
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ product }) {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="imgBox col-span-5 md:py-20 flex md:flex-row flex-col-reverse items-center justify-between mb-5 md:mb-0">
            <div className="left flex flex-1 md:flex-auto w-full md:w-auto md:flex-col gap-x-2 gap-y-3 justify-between">
                {product.images.map((img, index) => (
                    <div
                        key={index}
                        className={`box md:w-20 md:h-[90px] w-12 h-14 rounded-sm flex items-center justify-center
                            ${activeIndex == index ? 'border-primary border' : ''}`}
                    >
                        <div
                            className="img md:w-[70px] md:h-20 w-10 h-12 relative cursor-pointer"
                            onClick={() => setActiveIndex(index)}
                        >
                            <Image
                                src={img.filePath}
                                fill style={{ objectFit: 'contain' }}
                                alt={product.name}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="right">
                <div className="img relative md:w-[400px] w-60 md:h-[400px] h-60">
                    <Image
                        src={product.images[activeIndex].filePath}
                        fill
                        alt={product.name}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
};