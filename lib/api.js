import { products } from "@/constants/constants";

// Получить все продукты
export async function getAllProducts() {
    // const res = await fetch("https://fakestoreapi.com/products", {
    //     next: { revalidate: 60 },
    // });
    const res = products; // DELETE
    if (!res) throw new Error("Ошибка при загрузке продуктов");
    return res;
};

// Получить продукт по ID
// export async function getProductById(id) {
//     const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
//         next: { revalidate: 60 },
//     });
//     if (!res.ok) throw new Error("Ошибка при загрузке продукта");
//     return res.json();
// };

// Получить продукты по категории
export async function getProductsByCategory(category) {
    // const res = await fetch(`https://fakestoreapi.com/products/category/${category}`, {
    //     next: { revalidate: 60 },
    // });
    const res = products.filter((product) => product.category.toLocaleLowerCase() === String(category).toLocaleLowerCase()); // DELETE
    if (!res) throw new Error("Ошибка при загрузке категории");
    return res;
};