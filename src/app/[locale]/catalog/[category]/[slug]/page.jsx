import Link from "next/link";
import HomeIcon from '@/icons/home.svg'
import TopArrowICon from '@/icons/topArrow.svg'
import Image from "next/image";
import RatingIcon from "@/components/RatingIcon";
import { formatCurrency } from "@/utils/utils";
import { FaInstagram, FaTelegramPlane, FaTiktok, FaYoutube } from "react-icons/fa";
import ToBasket from "@/components/ToBasket";
import ProductImages from "@/components/ProductImages";
import ProductInfoComponents from "@/components/ProductInfoComponents";
import ProductSchema from "@/components/ProductSchema";
import { navMenu } from "@/constants/constants";
const BASE_URL = process.env.API_BASE_URL;

const socialMedia = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/vicalina.uz/',
        icon: <FaInstagram />
    },
    {
        name: 'Telegram',
        href: 'https://t.me/VicalinaOfficial',
        icon: <FaTelegramPlane />
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/@Vicalina_2009',
        icon: <FaYoutube />
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@vicalina.uz',
        icon: <FaTiktok />
    },
];

const translations = {
    uz: {
        catalog: "Katalog",
        available: "Mavjud",
        rating: "Reyting",
        peopleBought: "kishi sotib oldi",
        brand: "Brend:",
        share: "Ulashish:",
        catalogText: "Katalog:",
        tagText: "Teg:",
        slug: 'uz'
    },
    ru: {
        catalog: "Каталог",
        available: "В наличии",
        rating: "Рейтинг",
        peopleBought: "человек купили",
        brand: "Бренд:",
        share: "Поделиться:",
        catalogText: "Каталог:",
        tagText: "Тег:",
        slug: 'ru'
    }
};

export async function generateMetadata({ params }) {
    const { category, slug, locale } = params;
    const catFilter = navMenu.find((cat) => cat.slug.replace('/catalog/', '') === category);
    const decodeSlug = decodeURIComponent(slug);
    const normalizeSlug = (s) => s.replace(/[‘’`ʻʼ]/g, "'");
    const cleanSlug = normalizeSlug(decodeSlug);
    const [namePart, idPart] = cleanSlug.split('-id~');
    const name = namePart.replace(/-/gi, ' ');
    const id = idPart;

    const langMap = { uz: 1, ru: 2 };
    const languageId = langMap[locale] || 1;

    const resProduct = await fetch(`${BASE_URL}/api/Products/GetProductById/?languageId=${languageId}&productId=${id}`, {
        next: { tags: ['products'] },
    });

    const oneText = await resProduct.text();
    let product;
    try {
        product = JSON.parse(oneText);
    } catch (e) {
        console.error('Ошибка парсинга JSON:', oneText);
        product = null;
    }

    if (!product) {
        return {
            title: locale === 'ru' ? 'Товар не найден - Vicalina' : 'Mahsulot topilmadi - Vicalina',
            description: locale === 'ru' ? 'Извините, такой товар отсутствует.' : 'Kechirasiz, bunday mahsulot mavjud emas.',
            robots: 'noindex, nofollow',
        };
    }

    const productName = product.name || (locale === 'ru' ? 'Товар' : 'Mahsulot');
    const productPrice = product.discount ? product.newPrice : product.price;
    const productImage = product.images[0].filePath;

    return {
        title: `${productName} — ${formatCurrency(productPrice)} | Vicalina`,
        description: locale === 'ru'
            ? `${product.shortDescription}. Цена от ${productPrice} сум. Гарантия качества и быстрая доставка.`
            : `${product.shortDescription}. Endi ${productPrice} so'mdan boshlanadi. Sifat kafolati va tez yetkazib berish.`,
        keywords: `${productName}, ${product.category}, ${product.type}, ${product.color.join(', ')}, Vicalina`,
        openGraph: {
            title: `${productName} — ${locale === 'ru' ? 'купить сейчас' : 'xarid qiling hoziroq'}`,
            description: locale === 'ru' ? product.description : product.description,
            url: `https://vicalinaofficial.uz/${locale}${catFilter.slug}/${product.name.toLowerCase().replace(/\s+/g, '-')}-id~${product.id}`,
            siteName: 'Vicalina',
            images: [
                {
                    url: productImage,
                    alt: productName,
                },
            ],
            locale: locale === 'ru' ? 'ru_RU' : 'uz_UZ',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${productName} — Vicalina`,
            description: locale === 'ru' ? product.shortDescription : product.shortDescription,
            images: [productImage],
        },
        alternates: {
            canonical: `https://vicalinaofficial.uz/${locale}${catFilter.slug}/${product.name.toLowerCase().replace(/\s+/g, '-')}-id~${product.id}`,
        },
    };
}

export default async function ProductInfoPage({ params }) {

    const { category, slug, locale } = await params;
    const catFilter = navMenu.find((cat) => cat.slug.replace('/catalog/', '') === category);
    const decodeSlug = decodeURIComponent(slug);
    const normalizeSlug = (s) => s.replace(/[‘’`ʻʼ]/g, "'");
    const cleanSlug = normalizeSlug(decodeSlug);
    const [namePart, idPart] = cleanSlug.split('-id~');
    const name = namePart.replace(/-/gi, ' ');
    const id = idPart;

    const langMap = { uz: 1, ru: 2 };
    const languageId = langMap[locale] || 1;

    const resProduct = await fetch(`${BASE_URL}/api/Products/GetProductById/?languageId=${languageId}&productId=${id}`, {
        next: { tags: ['products'] },
    });
    const oneText = await resProduct.text();
    let product;
    try {
        product = JSON.parse(oneText);
    } catch (e) {
        console.error('Ошибка парсинга JSON:', oneText);
        product = [];
    };

    //  PRODUCTS
    const resProducts = await fetch(`${BASE_URL}/api/Products/GetAllProducts?languageId=${languageId}`, {
        next: { tags: ['products'] }
    });
    const text = await resProducts.text();
    let products;
    try {
        products = JSON.parse(text);
    } catch (e) {
        console.error('Ошибка парсинга JSON:', text);
        products = [];
    };

    const selectedCategory = Number(languageId) === 1 ? catFilter?.name : catFilter?.nameRu;
    const t = languageId === 1 ? translations.uz : translations.ru;

    console.log(catFilter.slug);


    return (
        <div className="productInfo">
            <div className="container">
                <div className="top md:my-12 my-8 flex items-center gap-x-3">
                    <Link href={`/${t.slug}`}>
                        <HomeIcon />
                    </Link>
                    <TopArrowICon />
                    <Link
                        href={`/${t.slug}/catalog/all-products`}
                        className='text-[#999] leading-normal'
                    >
                        {t.catalog}
                    </Link>
                    <TopArrowICon />
                    <Link
                        href={`/${t.slug}/catalog/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className='text-[#999] leading-normal'
                    >
                        {selectedCategory?.replace(/-/gi, ' ').charAt(0).toLocaleUpperCase() + selectedCategory?.replace(/-/gi, ' ').slice(1).toLocaleLowerCase()}
                    </Link>
                    <TopArrowICon />
                    <p className='text-primary leading-normal truncate'>
                        {name.charAt(0).toLocaleUpperCase() + name.slice(1)}
                    </p>
                </div>
                <div className="content md:grid grid-cols-11 gap-x-20">
                    <ProductImages
                        product={product}
                    />
                    <div className="col-span-6">
                        <div className="name flex items-center gap-x-2 mb-3">
                            <h2
                                className="text-4xl leading-tight font-semibold text-[#222222]"
                            >
                                {product.name}
                            </h2>
                            <span className="text-primary rounded px-2 py-1 bg-[#00006633] text-sm leading-normal">{t.available}</span>
                        </div>
                        <div className="ratingBox flex items-center">
                            <RatingIcon
                                value={product.rating}
                                className='!text-lg !text-orange'
                            />
                            <p className="text-sm leading-normal text-[#666] ml-1">{product.rating} {t.rating}</p>
                            <p className="font-medium text-sm leading-normal mx-3 text-[#B3B3B3]">•</p>
                            <p className="text-sm leading-normal text-[#666]">{product.numberOfPurchases}</p>
                            <p className="text-sm leading-normal font-medium text-[#333] ml-1">{t.peopleBought}</p>
                        </div>
                        <div className="priceBox flex items-center mt-5 pb-5 border-b">
                            {product.discount && (
                                <p
                                    className="text-xl text-[#B3B3B3] mr-1 relative leading-none
                                        after:absolute after:h-px after:top-1/2 after:left-0 after:w-full after:bg-[#b3b3b3]"
                                >
                                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                </p>
                            )}
                            <p className="text-2xl leading-normal font-medium text-primary">
                                {formatCurrency(product.discount ? product.newPrice : product.price)}
                            </p>
                            {product.discount && (
                                <div className="box px-2.5 py-[3px] bg-[#EA4B481A] ml-3 rounded-full">
                                    <p className="font-medium text-sm leading-normal text-[#EA4B48]">
                                        {-(((product.price - product.newPrice) / product.price) * 100).toFixed(0)}%
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="box mt-6 md:flex items-center justify-between">
                            <div className="brand flex items-center mb-3 md:mb-0">
                                <p className="text-sm leading-normal mr-2 text-[#1A1A1A]">{t.brand}</p>
                                <div className="box w-14 h-14 border rounded flex items-center justify-center">
                                    <div className="img w-12 h-12 relative">
                                        <Image
                                            fill
                                            src={'/images/logo.png'}
                                            style={{ objectFit: 'contain' }}
                                            alt='Vicalina'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="share flex items-center gap-x-2.5">
                                <p className="text-sm leading-normal text-[#1A1A1A]">{t.share}</p>
                                <div className="socialBox flex items-center gap-x-[5px]">
                                    {socialMedia.map((icon) => (
                                        <a
                                            key={icon.name}
                                            href={icon.href}
                                            target='_blank'
                                            className="box w-10 h-10 flex items-center justify-center
                                        hover:bg-primary hover:text-white rounded-full text-lg transition-all duration-200 ease-in-out"
                                        >
                                            {icon.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="shortDesc leading-normal text-sm text-[#808080] mt-4 mb-6">
                            {product.shortDescription}
                        </div>
                        <div className="toBasket py-[18px] border-y">
                            <ToBasket id={product.id} products={products} languageId={languageId} />
                        </div>
                        <div className="bottom mt-6">
                            <div className="box flex flex-col gap-y-3">
                                <p className="font-medium text-sm leading-normal">
                                    {t.catalogText}
                                    <span className="font-normal text-[#808080] ml-1">
                                        {selectedCategory?.replace(/-/gi, ' ').charAt(0).toLocaleUpperCase() + selectedCategory.replace(/-/gi, ' ').slice(1).toLocaleLowerCase()}
                                    </span>
                                </p>
                                <p className="font-medium text-sm leading-normal">
                                    {t.tagText}
                                    <span className="font-normal text-[#808080] ml-1">
                                        {product.tags}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductInfoComponents
                languageId={languageId}
                product={product}
            />
            <ProductSchema product={product} />
        </div>
    )
};