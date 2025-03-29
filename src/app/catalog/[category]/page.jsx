import Link from 'next/link';
import HomeIcon from '@/icons/home.svg'
import TopArrowICon from '@/icons/topArrow.svg'
import FilterComponents, { FilterButton, FilterDropdown, RatingChange, TagesSelect } from '@/components/FilterComponents';
import { cookies } from 'next/headers';
import { getAllProducts, getProductsByCategory } from '/lib/api';
import { formatCurrency, productsSlug } from '@/utils/utils';
import LikeButtonComponent from '@/components/LikeButtonComponent';
import Image from 'next/image';
import RatingIcon from '@/components/RatingIcon';
import Bag from '@/icons/bag.svg'

export default async function Products({ params, searchParams }) {

    const category = await params?.category?.replace(/-/gi, ' ');

    const allProducts = await getAllProducts();
    const categoryProducts = await getProductsByCategory(category);
    const productsWithSlug = productsSlug(allProducts);
    const productsWithSlugAndCategory = productsSlug(categoryProducts);

    const filter = await searchParams?.filter;
    const price = await searchParams?.price;
    const rating = await searchParams?.rating;
    const tag = await searchParams?.tag;
    let priceFrom = null;
    let priceTo = null;
    if (price) {
        const [from, to] = price?.split('-').map(Number);
        priceFrom = from;
        priceTo = to;
    };
    const cookieStore = await cookies();
    const isVisible = cookieStore?.get('isVisible')?.value === 'true';
    const products = async () => {
        if (category === 'barcha mahsulotlar') {
            return productsWithSlug;
        } else {
            return productsWithSlugAndCategory;
        };
    };

    const activeProducts = await products();

    let filteredProducts = activeProducts;

    // Фильтруем по цене
    if (price) {
        filteredProducts = activeProducts.filter((product) => {
            const currentPrice = product.discount && product.newPrice ? product.newPrice : product.price;
            return currentPrice >= priceFrom && currentPrice <= priceTo;
        });
    };

    // Фильтруем по рейтингу
    if (rating) {
        filteredProducts = filteredProducts.filter((product) => {
            return Math.floor(product.rating?.rate) >= Number(rating);
        });
    };

    // Фильтруем по тегу
    if (tag) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.tages?.toLowerCase().includes(tag.toLowerCase());
        });
    };

    // Сортировка по filter
    if (filter === 'rating') {
        filteredProducts.sort((a, b) => b.rating?.rate - a.rating?.rate);
    } else if (filter === 'cheaper') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filter === 'expensive') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filter === 'discounted') {
        filteredProducts = filteredProducts.map(product => ({
            ...product,
            discountAmount: product.price - product.newPrice,
            discountPercent: ((product.price - product.newPrice) / product.price) * 100
        })).sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (filter === 'newest') {
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    return (
        <div className="products">
            <div className="container">
                <div className="top my-12 flex items-center gap-x-3">
                    <Link href={'/'}>
                        <HomeIcon />
                    </Link>
                    <TopArrowICon />
                    <Link
                        href={'/catalog/barcha-mahsulotlar'}
                        className='text-[#999] leading-normal'
                    >
                        Katalog
                    </Link>
                    <TopArrowICon />
                    <p className='text-primary leading-normal'>
                        {category.charAt(0).toLocaleUpperCase() + category.slice(1)}
                    </p>
                </div>
                <div className="filterTopBox mb-6 grid grid-cols-4 gap-x-6 items-center">
                    <div className="box">
                        <FilterButton />
                    </div>
                    <div className="box flex items-center justify-between col-span-3">
                        <FilterDropdown
                            category={category}
                            filter={filter}
                            price={price}
                            rating={rating}
                            tag={tag}
                        />
                        <div className="resultBox">
                            <p className='text-[#808080] leading-normal'>
                                <span className='font-semibold text-[#1A1A1A] leading-tight'>
                                    {filteredProducts?.length}
                                </span> Natijalar topildi
                            </p>
                        </div>
                    </div>
                </div>
                <div className="filterBottomBox grid grid-cols-4 gap-x-6 ">
                    {isVisible && (
                        <div>
                            <FilterComponents
                                category={category}
                                products={productsWithSlug}
                                filteredProducts={filteredProducts}
                                priceFrom={priceFrom}
                                priceTo={priceTo}
                                filter={filter}
                                rating={rating}
                                price={price}
                                tag={tag}
                            />
                            <RatingChange
                                filter={filter}
                                rating={rating}
                                price={price}
                                tag={tag}
                                category={category}
                            />
                            <TagesSelect
                                filter={filter}
                                rating={rating}
                                price={price}
                                tag={tag}
                                category={category}
                                products={productsWithSlug}
                            />
                        </div>
                    )}
                    <div
                        className={`filteredProducts grid gap-x-10 gap-y-6 ${isVisible ? 'col-span-3 grid-cols-3' : 'col-span-4 grid-cols-4'}`}
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="productBox flex flex-col overflow-hidden rounded-[14px] group hover:shadow-md
                                    transition-all duration-300 ease-in-out"
                            >
                                <div className="top bg-[#F0F1F2] p-5 pb-[34px] rounded-b-[14px] group-hover:rounded-none
                                        transition-all duration-300 ease-in-out"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="discountBox">
                                            {product.discount && (
                                                <div className="py-2 px-3 bg-orange rounded-md text-white font-semibold text-xs leading-none
                                                        opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                                >
                                                    {`-${(((product.price - product.newPrice) / product.price) * 100).toFixed()}%`}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0
                                            group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                        >
                                            <LikeButtonComponent id={product.id} />
                                        </div>
                                    </div>
                                    <div className="imgBox relative w-[210px] h-[210px] mx-auto">
                                        <Image
                                            fill
                                            src={product.images[0]}
                                            style={{ objectFit: 'contain' }}
                                            alt={`${product.name} - ${product.shortDesc}`}
                                        />
                                    </div>
                                </div>
                                <div className="bottom flex-1 px-5 py-2.5 flex flex-col gap-y-1.5 justify-between">
                                    <Link
                                        href={product.slug}
                                        className='text-[#222] leading-[23px] hover:text-primary transition-all duration-200 ease-in-out'
                                    >
                                        {`${product.name} - ${product.shortDesc}`}
                                    </Link>
                                    <div className="flex flex-col gap-y-2.5">
                                        <div className="ratingBox flex items-center gap-x-2.5">
                                            <p className='text-[#484848] leading-[23px]'>
                                                {product.rating.rate}
                                            </p>
                                            <RatingIcon
                                                value={product.rating.rate}
                                                className='!text-sm !text-orange'
                                            />
                                        </div>
                                        <div className="priceBox flex items-center justify-between">
                                            <p className='font-bold text-lg leading-[23px]'>
                                                {formatCurrency(product.discount ? product.newPrice : product.price)}
                                            </p>
                                            <button className='bg-primary w-10 h-10 rounded-full flex items-center justify-center'>
                                                <Bag />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};