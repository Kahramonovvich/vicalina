'use client'
import Image from 'next/image'
import CloseIcon from '@/icons/Close.svg'
import { formatCurrency } from '@/utils/utils'
import { useLikedProduct } from '@/hooks/useLikedProducts'
import ToBasketFav from './ToBasketFav'

export default function FavoriteProductItem({ product, onRemove, products, languageId }) {

    const { toggleLiked } = useLikedProduct(product.id);

    const handleClick = () => {
        toggleLiked();
        onRemove();
    };

    return (
        <div className="box grid grid-cols-12 gap-x-1 items-center mx-6 py-5 border-t">
            <div className="product col-span-5 flex flex-col overflow-hidden md:flex-row items-center gap-x-5">
                <div className="imgBox relative md:w-28 w-24 md:h-20 h-14">
                    <Image
                        fill
                        src={product.images[0].filePath}
                        alt={product.name}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <p className='leading-normal truncate w-full'>
                    {product.name}
                </p>
            </div>
            <div className="price col-span-3 font-medium leading-normal">
                {formatCurrency(product.discount ? product.newPrice : product.price)}
            </div>
            <div className="flex items-center justify-between status col-span-4">
                <div className={`px-2 py-1 text-sm leading-normal rounded w-max
                    ${product.quantity > 0 ? 'bg-[#20B52633] text-[#2C742F]' : 'bg-[#EA4B4833] text-[#EA4B48]'}`}>
                    {product.quantity > 0 ? 'Mavjud' : 'Tez orada'}
                </div>
                <div className="toBasket flex items-center gap-x-6">
                    <div className="box hidden md:block">
                        <ToBasketFav
                            products={products}
                            languageId={languageId}
                            id={product.id}
                        />
                    </div>
                    <button onClick={handleClick}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <div className='col-span-12 mt-2 md:hidden'>
                <ToBasketFav
                    products={products}
                    languageId={languageId}
                    id={product.id}
                />
            </div>
        </div>
    )
}