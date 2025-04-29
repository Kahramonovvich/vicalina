import { navMenu } from "@/constants/constants";

export default function ProductSchema({ product }) {

    const productPrice = product.discount ? product.newPrice : product.price;
    const category = navMenu.find(
        (cat) =>
            cat.name.toLowerCase() === product.category.toLowerCase() ||
            cat.nameRu.toLowerCase() === product.category.toLowerCase()
    );
    const categorySlug = category ? category.slug : 'unknown-category';

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.images.map((img) => img.filePath),
        "description": product.description,
        "sku": product.sku,
        "brand": {
            "@type": "Brand",
            "name": "Vicalina"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "UZS",
            "price": productPrice,
            "availability": "https://schema.org/InStock",
            "url": `https://vicalinaofficial.uz${categorySlug}/${product.name.toLowerCase().replace(/\s+/g, '-')}-id~${product.id}`,
            "priceValidUntil": "2025-12-31" // можешь вставить дату динамически, если надо
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating || "5",
            "reviewCount": product.ratingCount || "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": product.reviewAuthor || "Пользователь",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": product.rating || "5",
                    "bestRating": "5"
                },
                "reviewBody": product.review || "Отличный товар!"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};