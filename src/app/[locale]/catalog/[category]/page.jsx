import Link from 'next/link';
import HomeIcon from '@/icons/home.svg'
import TopArrowICon from '@/icons/topArrow.svg'
import FilterComponents, { FilterButton, FilterDropdown, RatingChange, TagesSelect } from '@/components/FilterComponents';
import { formatCurrency, productsSlug } from '@/utils/utils';
import LikeButtonComponent from '@/components/LikeButtonComponent';
import Image from 'next/image';
import RatingIcon from '@/components/RatingIcon';
import AddToBasketButton from '@/components/AddToBasketButton';
import ThemeRegistry from '../../providers/ThemeRegistry';
import { navMenu } from '@/constants/constants';
const BASE_URL = process.env.API_BASE_URL;

export default async function Products({ params, searchParams }) {

    let { category, locale } = await params;
    category = category.replace(/-/g, ' ');

    const catFilter = navMenu.find((cat) => cat.slug.replace('/catalog/', '') === category.replace(/ /g, '-'));
    const langMap = { uz: "uzb", ru: "ru", en: "en" };
    const languageId = langMap[locale] || "uzb";

    let resProducts = [];
    try {
        const res = await fetch(`${BASE_URL}/api/Products/GetAllProducts?language=${languageId}`,
            {
                next: { tags: ['products'], revalidate: 60 },
            });
        if (res.ok) {
            resProducts = await res.json();
        } else {
            console.error('Ошибка при запросе продуктов:', res.status);
        };
    } catch (error) {
        console.error('Ошибка при запросе продуктов:', error);
    };

    const allProducts = await resProducts || [];
    const productsWithSlug = await productsSlug(allProducts);

    let categoryProducts = [];
    let selectedCategory = catFilter?.name;

    if (category !== 'all products') {
        const resCategory = await fetch(
            `${BASE_URL}/api/Products/GetAllProductByCategory/${selectedCategory?.toLocaleUpperCase()}?language=${languageId}`,
            {
                next: { tags: ['products'], revalidate: 60 }
            }
        );

        if (resCategory.ok) {
            categoryProducts = await resCategory.json();
        } else {
            console.error('Ошибка при запросе категорий:', resCategory.status);
            categoryProducts = [];
        };
    } else {
        selectedCategory = languageId === "uzb" ? 'Barcha mahsulotlar' : 'Все продукты';
    };

    const productsWithSlugAndCategory = await productsSlug(categoryProducts);

    const { filter, price, rating, tag } = await searchParams;

    let priceFrom = null;
    let priceTo = null;
    if (price) {
        const [from, to] = price?.split('-').map(Number);
        priceFrom = from;
        priceTo = to;
    };
    const products = async () => {
        if (category === 'all products') {
            return productsWithSlug;
        } else {
            return productsWithSlugAndCategory;
        };
    };

    const activeProducts = await products();

    let filteredProducts = activeProducts;

    if (price) {
        filteredProducts = activeProducts.filter((product) => {
            const currentPrice = product.discount && product.newPrice ? product.newPrice : product.price;
            return currentPrice >= priceFrom && currentPrice <= priceTo;
        });
    };

    if (rating) {
        filteredProducts = filteredProducts.filter((product) => {
            return Math.floor(product.rating) >= Number(rating);
        });
    };

    if (tag) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.tages?.toLowerCase().includes(tag.toLowerCase());
        });
    };

    if (filter === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
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
                <div className="top md:my-12 my-8 flex items-center gap-x-3">
                    <Link href={`/${languageId === "uzb" ? 'uz' : 'ru'}`}>
                        <HomeIcon />
                    </Link>
                    <TopArrowICon />
                    <Link
                        href={`/${languageId === "uzb" ? 'uz' : 'ru'}/catalog/all-products`}
                        className='text-[#999] leading-normal'
                    >
                        {languageId === "uzb" ? 'Katalog' : 'Каталог'}
                    </Link>
                    <TopArrowICon />
                    <p className='text-primary leading-normal'>
                        {selectedCategory?.charAt(0)?.toLocaleUpperCase() + selectedCategory?.slice(1).toLowerCase()}
                    </p>
                </div>
                <div className="filterTopBox mb-6 grid grid-cols-4 md:gap-x-6 gap-x-3 items-center">
                    <div className="box">
                        <FilterButton />
                    </div>
                    <div className="box md:flex items-center justify-between col-span-3">
                        <FilterDropdown
                            category={category}
                            filter={filter}
                            price={price}
                            rating={rating}
                            tag={tag}
                            languageId={languageId}
                        />
                        <div className="resultBox hidden md:block">
                            <p className='text-[#808080] leading-normal'>
                                {languageId === "uzb" ? (
                                    <>
                                        <span className='font-semibold text-[#1A1A1A] leading-tight'>
                                            {filteredProducts?.length}
                                        </span> ta mahsulot topildi
                                    </>
                                ) : (
                                    <>
                                        Найдено{" "}
                                        <span className='font-semibold text-[#1A1A1A] leading-tight'>
                                            {filteredProducts?.length}
                                        </span> товаров
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="filterBottomBox grid grid-cols-4 gap-x-6 ">
                    <div className='col-span-4 md:col-span-1'>
                        <ThemeRegistry>
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
                                languageId={languageId}
                            />
                        </ThemeRegistry>
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
                    <div
                        className={`filteredProducts grid md:gap-x-10 gap-x-2 md:gap-y-6 gap-y-4 grid-cols-2 md:grid-cols-3 md:col-span-3 col-span-4`}
                    >
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="productBox flex flex-col overflow-hidden rounded-[14px] group hover:shadow-md
                                    transition-all duration-300 ease-in-out"
                            >
                                <div className="top bg-[#F0F1F2] rounded-b-[14px] group-hover:rounded-none relative
                                        transition-all duration-300 ease-in-out aspect-square"
                                >
                                    <div className="flex items-center justify-between absolute top-0 left-0 z-20 w-full p-3">
                                        <div className="discountBox">
                                            {product.discount && (
                                                <div className="py-2 px-3 bg-orange rounded-md text-white font-semibold text-xs leading-none
                                                        opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                                >
                                                    {`-${(((product.price - product.newPrice) / product.price) * 100).toFixed()}%`}
                                                </div>
                                            )}
                                        </div>
                                        <div className="md:w-10 w-7 md:h-10 h-7 bg-white rounded-full flex items-center justify-center opacity-0
                                            group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                        >
                                            <LikeButtonComponent id={product.id} />
                                        </div>
                                    </div>
                                    <div className="imgBox relative w-full h-full mx-auto">
                                        <Image
                                            fill
                                            src={product.images[0].filePath}
                                            style={{ objectFit: 'cover' }}
                                            alt={`${product.name} - ${product.shortDescription}`}
                                            unoptimized
                                            loading='lazy'
                                        />
                                    </div>
                                </div>
                                <div className="bottom flex-1 md:px-5 px-3 py-2.5 flex flex-col gap-y-1.5 justify-between">
                                    <Link
                                        href={languageId === "uzb" ? '/uz' + product.slug : '/ru' + product.slug}
                                        className='text-[#222] md:leading-[23px] text-sm md:text-base hover:text-primary transition-all duration-200 ease-in-out'
                                    >
                                        {`${product.name} - ${product.shortDescription}`}
                                    </Link>
                                    <div className="flex flex-col gap-y-2.5">
                                        <div className="ratingBox flex items-center gap-x-2.5">
                                            <p className='text-[#484848] leading-[23px]'>
                                                {product.rating}
                                            </p>
                                            <RatingIcon
                                                value={product.rating}
                                                className='!text-sm !text-orange'
                                            />
                                        </div>
                                        <div className="priceBox md:flex items-center justify-between">
                                            <p className='font-bold md:text-lg md:leading-[23px] mb-3 md:mb-0'>
                                                {formatCurrency(product.discount ? product.newPrice : product.price)}
                                            </p>
                                            <AddToBasketButton
                                                id={product.id}
                                                products={allProducts}
                                            />
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