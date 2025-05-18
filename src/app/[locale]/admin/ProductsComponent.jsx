'use client'
import { formatCurrency } from "@/utils/utils"
import { CircularProgress, Pagination } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import CreateProductModal from "./CreateProductModal"
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useRouter } from "next/navigation"
import UpdateProductModal from "./UpdateProductModal"

export default function ProductsComponent({ products, languageId, token }) {

    const itemsPerPage = 10;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const slu = Number(languageId) === 1 ? 'uz' : 'ru';

    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({});

    const router = useRouter();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleOpen = () => setOpenModal(true);

    const handleOpenUpdate = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/Products/GetProductById/${id}?languageId=${languageId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                next: {
                    tags: ['products']
                },
            });
            if (res.ok) {
                const product = await res.json();
                setProduct(product);
                setOpenUpdateModal(true);
            };
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        };
    };

    const deleteProduct = async (productId) => {
        if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;

        setIsLoading(true);

        const res1 = await fetch(`/api/Products/DeleteProduct/${productId}?languageId=1`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        await delay(3000);

        const res2 = await fetch(`/api/Products/DeleteProduct/${productId}?languageId=2`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (res1.ok && res2.ok) {
            alert('O`chirildi!');
            setIsLoading(false);
            router.refresh();
        } else {
            alert("O‘chirishda xatolik yuz berdi");
            setIsLoading(false);
            router.refresh();
        }
    };

    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products?.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts?.slice(startIndex, endIndex);

    useEffect(() => {
        if (isLoading) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isLoading]);

    return (
        <div className="productsComponent p-3">
            {isLoading && (
                <div className="box fixed flex items-center justify-center top-0 left-0 w-full h-full bg-white bg-opacity-90 z-[99999999]">
                    <CircularProgress />
                </div>
            )}
            <div className="filterBox mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Mahsulotlar</h3>
                <div className="left flex gap-x-3">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="p-3 border outline-none w-80 rounded-lg"
                        placeholder="Mahsulot nomini kiriting"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button
                        onClick={handleOpen}
                        className="text-lg bg-primary p-3 text-white rounded-lg"
                    >
                        Mahsulot yaratish
                    </button>
                </div>
            </div>
            <div className="products flex flex-col gap-y-2 mb-5">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="box border rounded-lg p-3 grid grid-cols-12 items-center gap-x-5 hover:bg-slate-100 transition-all duration-300 ease-in-out"
                        >
                            <div className="img col-span-2 relative w-full h-20">
                                <Image
                                    fill
                                    src={product.images[0].filePath}
                                    alt={product.name}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <Link
                                href={`/${slu}${product.slug}`}
                                className="name col-span-5 text-lg font-semibold truncate"
                            >
                                {product.name}
                            </Link>
                            <div className="price col-span-2 text-lg font-semibold">
                                {formatCurrency(product.discount ? product.newPrice : product.price)}
                            </div>
                            <div className="btnBox col-span-3 flex items-center justify-end gap-x-5">
                                <button
                                    className="bg-primary p-2 text-white rounded-full"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    <DeleteOutlineRoundedIcon />
                                </button>
                                <button
                                    className="bg-primary p-2 text-white rounded-full"
                                    onClick={() => handleOpenUpdate(product.id)}
                                >
                                    <EditRoundedIcon />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">Mahsulot topilmadi</div>
                )}
            </div>
            {filteredProducts.length > itemsPerPage && (
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                />
            )}
            <CreateProductModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                token={token}
            />
            <UpdateProductModal
                openModal={openUpdateModal}
                setOpenModal={setOpenUpdateModal}
                languageId={languageId}
                product={product}
            />
        </div>
    )
};