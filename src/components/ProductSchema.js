export default function ProductSchema({ product }) {

    const productPrice = product.discount ? product.newPrice : product.price;

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.images,
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
            "url": `https://vicalinaofficial.uz/catalog/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.name.toLowerCase().replace(/\s+/g, '-')}-id~${product.id}`

        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
};