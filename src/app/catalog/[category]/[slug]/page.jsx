import { getProductById } from "/lib/api";

export default async function ProductInfoPage({ params }) {

    const { category, slug } = params;
    const [namePart, idPart] = slug.split('-id~');
    const name = namePart.replace(/-/gi, ' ');
    const id = idPart;

    const product = await getProductById(id);

    console.log(product);


    return (
        <div className="productInfo h-96 flex items-center justify-center">
            <p className="text-5xl text-center">
                Xozircha mavjud emas!
                <br />
                <br />
                Ish jarayonida!
            </p>
        </div>
    )
};