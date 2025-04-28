import { navMenu } from "@/constants/constants";

export const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    const formatted = String(value)
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} so’m`;
};

export const productsSlug = async (product) => {
    const productsWithSlug = await product.map((prod) => {
        const category = navMenu.find(
            (cat) =>
                cat.name.toLowerCase() === prod.category.toLowerCase() ||
                cat.nameRu.toLowerCase() === prod.category.toLowerCase()
        );

        const categorySlug = category ? category.slug : 'unknown-category';

        return {
            ...prod,
            slug: `${categorySlug}/${prod.name.toLowerCase().replace(/\s+/g, '-')}-id~${prod.id}`
        };
    });

    return productsWithSlug;
};