import { useParams } from "react-router";
import { initialProducts } from "../mockData";

export default function ProductDetailPage() {
    const { id } = useParams();
    const productId = Number(id);

    const product = initialProducts.find((product) => product.id === productId);

    if (!product) {
        return <p>Produkten hittades inte.</p>;
    }

    return <h1>{product.title}</h1>;
}
