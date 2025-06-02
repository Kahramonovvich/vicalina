'use cleint'
import { formatCurrency } from "@/utils/utils"
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersComponent({ orders, products, languageId, token }) {

    const router = useRouter();

    const slug = Number(languageId) === 1 ? 'uz' : 'ru';

    const [isLoading, setIsLoading] = useState(false);

    const updateOrderStatus = async ({ orderId, status }) => {

        setIsLoading(true);

        try {
            const res = await fetch(`/api/Order/ChangeStatus/${orderId}?status=${status}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (res.ok) {
                router.refresh();
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }

            if (!res.ok) throw new Error("Не удалось обновить статус заказа");
        } catch (error) {
            console.error(error);
            alert('Xatolik');
        };
    };

    useEffect(() => {
        if (isLoading) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isLoading]);

    return (
        <div className="OrdersComponent p-3 flex flex-col gap-y-3">
            {isLoading && (
                <div className="box fixed flex items-center justify-center top-0 left-0 w-full h-full bg-white bg-opacity-90 z-[99999999]">
                    <CircularProgress />
                </div>
            )}
            {[...orders]?.reverse().map((item) => (
                <div
                    className="box border p-2 rounded-md odd:bg-primary odd:bg-opacity-20"
                    key={item.id}
                >
                    <div className="top border-b pb-3 mb-3 flex items-end justify-between">
                        <div className="left">
                            <p className="font-semibold">
                                Ismi: {item.customer.name} ID: {item.id}
                            </p>
                            <p className="font-semibold">
                                Telefon raqami: {item.customer.phoneNumber}
                            </p>
                            <p className="font-semibold">
                                Umumiy narxi: {formatCurrency(item.totalAmount)}
                            </p>
                        </div>
                        <div className="right">
                            <p className="bg-orange py-1 px-2 rounded-md text-white font-semibold">
                                {item.status === 1 && 'Yangi'}
                                {item.status === 2 && 'Yetkazib berilmoqda'}
                                {item.status === 3 && 'Yetkazib berildi'}
                                {item.status === 4 && 'Bekor qilingan'}
                            </p>
                        </div>
                    </div>
                    <div className="bottom flex flex-col gap-y-2">
                        {item.products.map((product) => {
                            const orderedProducts = products.find((prod) => (prod.id === product.productId));
                            return (
                                <div
                                    key={product.id}
                                    className="box border rounded-md p-2 grid grid-cols-12 gap-x-5"
                                >
                                    <div className="img col-span-2 relative h-24 border rounded-md">
                                        <Image
                                            src={orderedProducts?.images[0]?.filePath}
                                            alt={orderedProducts?.name}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div className="name col-span-6">
                                        <Link
                                            href={`/${slug}${orderedProducts?.slug}`}
                                            className="font-semibold text-lg truncate hover:text-primary w-full block"
                                        >
                                            Mahsulot nomi: {orderedProducts?.name} - {orderedProducts?.shortDescription}
                                        </Link>
                                    </div>
                                    <div className="count col-span-2">
                                        <p className="font-semibold text-lg">
                                            Soni: {product.count}
                                        </p>
                                    </div>
                                    <div className="sku col-span-2">
                                        <p className="font-semibold text-lg">
                                            SKU: {orderedProducts?.sku}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {item.status === 1 && (
                        <div className="btnBox mt-2 flex items-end justify-end gap-x-5">
                            <button
                                className="font-semibold p-2 bg-primary text-white rounded-md"
                                onClick={() => updateOrderStatus({ orderId: item.id, status: 2 })}
                            >
                                Yetkazib berilmoqda
                            </button>
                            <button
                                className="font-semibold p-2 bg-red-500 text-white rounded-md"
                                onClick={() => updateOrderStatus({ orderId: item.id, status: 4 })}
                            >
                                Bekor qilish
                            </button>
                        </div>
                    )}
                    {item.status === 2 && (
                        <div className="btnBox mt-2 flex items-end justify-end gap-x-5">
                            <button
                                className="font-semibold p-2 bg-green-500 text-white rounded-md"
                                onClick={() => updateOrderStatus({ orderId: item.id, status: 2 })}
                            >
                                Yetkazib berildi
                            </button>
                            <button
                                className="font-semibold p-2 bg-red-500 text-white rounded-md"
                                onClick={() => updateOrderStatus({ orderId: item.id, status: 4 })}
                            >
                                Bekor qilish
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
};