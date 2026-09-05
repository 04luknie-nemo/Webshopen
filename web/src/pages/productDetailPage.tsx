import { useParams } from "react-router";
import { initialProducts } from "../mockData";

export default function ProductDetailPage() {
    const { id } = useParams();
    const productId = Number(id);

    const product = initialProducts.find((product) => product.id === productId);

    if (!product) {
        return <p>Produkten hittades inte.</p>;
    }

    return (
        <section>
            <img src={product.imageUrl} alt={product.title} />
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Pris: {product.price} kr</p>
        </section>
    );
}
