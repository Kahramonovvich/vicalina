'use client'
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ product }) {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="imgBox col-span-5 py-20 flex items-center justify-between">
            <div className="left flex flex-col gap-y-3">
                {product.images.map((img, index) => (
                    <div
                        key={index}
                        className={`box w-20 h-[90px] rounded-sm flex items-center justify-center
                            ${activeIndex == index ? 'border-primary border' : ''}`}
                    >
                        <div
                            className="img w-[70px] h-20 relative cursor-pointer"
                            onClick={() => setActiveIndex(index)}
                        >
                            <Image
                                src={img}
                                fill style={{ objectFit: 'contain' }}
                                alt={product.name}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="right">
                <div className="img relative w-[400px] h-[400px]">
                    <Image
                        src={product.images[activeIndex]}
                        fill
                        alt={product.name}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
};