export const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    const formatted = String(value)
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted} so’m`;
};

export const productsSlug = async (product) => {
    const productsSlug = await product?.map(item => ({
        ...item,
        slug: `/catalog/${item.category.toLowerCase().replace(/\s+/g, '-')}/${item.name.toLowerCase().replace(/\s+/g, '-')}-id~${item.id}`
    }));
    return productsSlug;
};