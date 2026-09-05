import { useState, type SubmitEvent } from "react"
import { initialProducts } from "../mockData"
import type { Product } from "../types";
export default function AdminPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [imageUrl, setImageUrl] = useState("");
    const [stock, setStock] = useState<number | "">("");

    function addProduct(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (stock === "" || price === "")
            return;

        const newProduct: Product = {
            id: 11,
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            stock: stock
        }
        console.log(newProduct);
        initialProducts.push(newProduct);
        setTitle('');
        setDescription('');
        setPrice("");
        setImageUrl('');
        setStock("");
    }
    return (
        <>
            <form onSubmit={addProduct} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'lightblue', width: '20rem', margin: '0 auto', gap: '1rem' }}>
                <input style={{ border: '0.15rem solid black' }} value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="titel" />
                <input style={{ border: '0.15rem solid black' }} value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="beskrivning" />
                <input style={{ border: '0.15rem solid black' }} value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="pris" />
                <input style={{ border: '0.15rem solid black' }} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="url" />
                <input style={{ border: '0.15rem solid black' }} value={stock} onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))} type="number" placeholder="stock" />
                <button style={{ border: '0.15rem solid black' }} type="submit">Submit</button>
            </form>
        </>
    )
} 1