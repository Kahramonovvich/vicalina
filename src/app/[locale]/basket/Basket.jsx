'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import HomeIcon from '@/icons/home.svg'
import TopArrowICon from '@/icons/topArrow.svg'
import { formatCurrency } from "@/utils/utils"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@/icons/Close.svg'
import { useBasket } from "@/context/basket-context"
import MultiOrderModal from "@/components/MultiOrderModal"

export default function BasketClient({ products }) {

    const { setBasket } = useBasket();

    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        loadBasket();
    }, [products]);

    const loadBasket = () => {
        const basket = JSON.parse(localStorage.getItem('productsToBasket') || '[]')
        const result = basket.map(basketItem => {
            const product = products.find(p => p.id === basketItem.id)
            const productPrice = product?.discount ? product.newPrice : product.price
            if (product) {
                return {
                    ...product,
                    qty: basketItem.qty,
                    total: productPrice * basketItem.qty
                }
            }
            return null
        }).filter(Boolean)

        setItems(result);
        setBasket(result);
    }

    const updateQty = (productId, delta) => {
        let basket = JSON.parse(localStorage.getItem('productsToBasket') || '[]');
        const index = basket.findIndex(item => item.id === productId);
        if (index !== -1) {
            basket[index].qty += delta;
            if (basket[index].qty <= 0) basket.splice(index, 1);
            localStorage.setItem('productsToBasket', JSON.stringify(basket));
            loadBasket();
        }
    }

    const clearBasket = () => {
        localStorage.removeItem('productsToBasket');
        setItems([]);
        setBasket([]);
    };

    const totalPrice = items.reduce((sum, item) => sum + item.total, 0);
    const deliveryFee = totalPrice >= 1500000 ? 0 : 20000;
    const finalPrice = totalPrice + deliveryFee;

    return (
        <div className="basket">
            <MultiOrderModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                products={items?.map(p => ({ productId: p.id, count: p.qty }))}
                totalAmount={totalPrice}
            />
            <div className="container">
                <div className="top md:my-12 my-5 flex items-center gap-x-3">
                    <Link href={'/'}>
                        <HomeIcon />
                    </Link>
                    <TopArrowICon />
                    <p className='text-primary leading-normal'>
                        Savatchangiz
                    </p>
                </div>

                <h2 className="mb-5 font-semibold text-[32px] leading-tight">
                    Savatchangiz
                </h2>

                <div className="box md:grid grid-cols-3 gap-x-6 flex flex-col gap-y-5">
                    <div className="left col-span-2 border rounded-lg py-4">
                        <div className="top hidden md:grid grid-cols-12 border-b px-5 pb-4 uppercase font-medium text-sm text-[#808080]">
                            <div className="col-span-5">Maxsulot</div>
                            <div className="col-span-7 grid grid-cols-3 gap-x-3">
                                <p>Narx</p>
                                <p>Soni</p>
                                <p>Umumiy narx</p>
                            </div>
                        </div>

                        {items.map(item => (
                            <div
                                key={item.id}
                                className="center md:px-5 px-3 py-3 md:grid grid-cols-12 items-center border-b"
                            >
                                <div className="imgBox col-span-5 flex gap-4 items-center">
                                    <div className="img relative w-28 h-20">
                                        <Image
                                            src={item.images[0].filePath}
                                            alt={item.name}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                    <p className="font-medium">{item.name}</p>
                                </div>
                                <div className="col-span-7 mt-5 grid md:grid-cols-3 grid-cols-2 items-center gap-x-3 text-sm text-[#333] font-medium">
                                    <p className="hidden md:block">{formatCurrency(item.discount ? item.newPrice : item.price)}</p>
                                    <div className="box p-2 border rounded-full flex items-center gap-x-3 w-max">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex items-center justify-center"
                                        >
                                            <RemoveIcon />
                                        </button>
                                        <p>{item.qty}</p>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-[34px] h-[34px] bg-[#F2F2F2] rounded-full flex items-center justify-center"
                                        >
                                            <AddIcon />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-x-5">
                                        <p>{formatCurrency(item.total)}</p>
                                        <button onClick={() => updateQty(item.id, -99999999)}>
                                            <CloseIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bottom flex items-center justify-between gap-x-2 md:px-5 px-3 pt-4 border-t">
                            <Link
                                href={`/catalog/barcha-mahsulotlar`}
                                className="py-3.5 md:px-8 px-4 font-semibold text-sm leading-tight text-[#4D4D4D] bg-[#F2F2F2] rounded"
                            >
                                Xaridlarga qaytish
                            </Link>
                            <button
                                onClick={clearBasket}
                                className="py-3.5 md:px-8 px-4 font-semibold text-sm leading-tight text-[#4D4D4D] bg-[#F2F2F2] rounded"
                            >
                                Yangilash
                            </button>
                        </div>
                    </div>
                    <div className="right border rounded-lg p-6 h-max">
                        <p className="font-medium text-xl leading-normal text-[#1A1A1A]">Jami:</p>

                        <div className="box flex items-center justify-between h-12">
                            <p className="leading-normal text-[#4D4D4D]">Narx:</p>
                            <p className="text-sm font-medium leading-normal">
                                {formatCurrency(totalPrice)}
                            </p>
                        </div>
                        <div className="box flex items-center justify-between h-12 border-y">
                            <p className="leading-normal text-[#4D4D4D]">Yetkazib berish:</p>
                            <p className="text-sm font-medium leading-normal">
                                {deliveryFee === 0 ? 'Tekin' : formatCurrency(deliveryFee)}
                            </p>
                        </div>
                        <div className="box flex items-center justify-between h-12">
                            <p className="font-bold leading-normal text-[#4D4D4D]">Umumiy narx:</p>
                            <p className="font-bold text-sm leading-normal">
                                {formatCurrency(finalPrice)}
                            </p>
                        </div>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-primary text-white rounded-full py-2 px-5 mt-3"
                        >
                            Buyurtma qilish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};