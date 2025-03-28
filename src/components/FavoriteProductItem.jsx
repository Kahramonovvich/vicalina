'use client'
import Image from 'next/image'
import CloseIcon from '@/icons/Close.svg'
import { formatCurrency } from '@/utils/utils'
import { useLikedProduct } from '@/hooks/useLikedProducts'

export default function FavoriteProductItem({ product, onRemove }) {

    const { toggleLiked } = useLikedProduct(product.id);

    const handleClick = () => {
        toggleLiked();
        onRemove();
    };

    return (
        <div className="box grid grid-cols-12 items-center mx-6 py-5 border-t">
            <div className="product col-span-5 flex items-center gap-x-5">
                <div className="imgBox relative w-28 h-20">
                    <Image
                        fill
                        src={product.images[0]}
                        alt={product.name}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <p className='leading-normal'>
                    {product.name}
                </p>
            </div>
            <div className="price col-span-3 font-medium leading-normal">
                {formatCurrency(product.discount ? product.newPrice : product.price)}
            </div>
            <div className="flex items-center justify-between status col-span-4">
                <div className={`px-2 py-1 text-sm leading-normal rounded w-max
                    ${product.qty > 0 ? 'bg-[#20B52633] text-[#2C742F]' : 'bg-[#EA4B4833] text-[#EA4B48]'}`}>
                    {product.qty > 0 ? 'Mavjud' : 'Tez orada'}
                </div>
                <div className="toBasket flex items-center gap-x-6">
                    <button className='bg-primary px-8 py-3.5 rounded text-white'>
                        Savatga qo’shish
                    </button>
                    <button onClick={handleClick}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}
