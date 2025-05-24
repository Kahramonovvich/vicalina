'use cleint'

import { formatCurrency } from "@/utils/utils"
import Image from "next/image";
import Link from "next/link";

export default function OrdersComponent({ orders, products, languageId }) {

    const slug = Number(languageId) === 1 ? 'uz' : 'ru';

    return (
        <div className="OrdersComponent p-3 flex flex-col gap-y-3">
            {[...orders]?.reverse().map((item) => (
                <div
                    className="box border p-2 rounded-md odd:bg-primary odd:bg-opacity-20"
                    key={item.id}
                >
                    <div className="top border-b pb-3 mb-3">
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
                </div>
            ))}
        </div>
    )
};