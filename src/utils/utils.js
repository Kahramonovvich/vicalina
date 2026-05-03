import { navMenu } from "@/constants/constants";

export const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    const formatted = String(value)
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} so’m`;
};

export const productsSlug = async (product = []) => {
    if (!product || product.length === 0) {
        return [];
    } else {
        try {
            if (!Array.isArray(product)) {
                console.error('Expected an array of products');
                return [];
            };
            const productsWithSlug = product.map((prod) => {
                const category = navMenu.find(
                    (cat) => cat.name.toLowerCase() === prod.category.toLowerCase() ||
                        cat.nameRu.toLowerCase() === prod.category.toLowerCase()
                );

                const categorySlug = category ? category.slug : 'unknown-category';

                return {
                    ...prod,
                    slug: `${categorySlug}/${prod.name.toLowerCase().replace(/\s+/g, '-')}-id~${prod.id}`
                };
            });

            return productsWithSlug;
        } catch (error) {
            console.error('Error generating product slugs:', error);
            return [];
        };
    }
};