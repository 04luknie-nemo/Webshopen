import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import type { Product } from "../types";
import { Box, Button, Checkbox, Container, FormControlLabel, TextField } from "@mui/material";

// Hämtar alla produkter från API:t (GET)
async function getAllProducts() {
    const res = await fetch("/v1/products");
    return res.json();
}

// Skickar en ny produkt till API:t (POST)
// Omit<Product, "id"> = samma typ som Product, men utan id
// (id skapas av databasen, inte av frontend)
async function addProduct(newProduct: Omit<Product, "id">) {
    const res = await fetch("/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
    });
    return res.json();
}
async function removeProduct(productId: number) {
    const res = await fetch("/v1/products/" + productId, {
        method: "DELETE"
    });
    return res.json();
}

export default function AdminPage() {
    // State för varje formulärfält
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [imageUrl, setImageUrl] = useState("");
    const [stock, setStock] = useState<number | "">("");
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    // queryClient ger tillgång till react-query cachen,
    // används för att tvinga fram en ny hämtning senare
    const queryClient = useQueryClient();

    // Hämtar produktlistan automatiskt när komponenten laddas.
    // queryKey ["products"] är etiketten på denna data i cachen.
    const getQuery = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
    // Kör POST-anropet, men bara när addProductMutation.mutate() anropas,
    // inte automatiskt som useQuery
    const addProductMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            // Efter en lyckad post, hämta produktlistan igen
            // så den nya produkten visas utan sidladdning
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const removeProductMutation = useMutation({
        mutationFn: removeProduct,
        onSuccess: (_, productId) => {
            queryClient.invalidateQueries({ queryKey: ["products"] }),
            setCheckedIds((prev) => prev.filter((id) => id !== productId))
        },
    });

    function handleChecked(productId: number, checked: boolean) {
        setCheckedIds((prev) => 
            checked ? [...prev, productId] : prev.filter((itemId) => itemId !== productId)
        );
    }
    // Körs när användaren trycker på Submit
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (stock === "" || price === "") return;

        // Startar POST-anropet med datan från formuläret
        addProductMutation.mutate({
            title,
            description,
            price,
            imageUrl,
            stock,
        });

        // Nollställ formuläret efter submit
        setTitle("");
        setDescription("");
        setPrice("");
        setImageUrl("");
        setStock("");
    }
    function handleRemoveProduct(productId: number) {
        removeProductMutation.mutate(productId);
    }

    return (
        <>
            <Box component={"main"} sx={{display: "flex", justifyContent: "space-between", flex: "1", padding: "1rem", margin: "0", marginTop: "2rem"}}>
                <Container sx={{ display: "flex", justifyContent: "center", padding: "1rem", width:"30rem" }}>
                    <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: '1rem' }}>
                        <TextField value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Titel" />
                        <TextField value={description} onChange={(event) => setDescription(event.target.value)} type="text" placeholder="Beskrivning" />
                        <TextField value={price} onChange={(event) => setPrice(event.target.value === "" ? "" : Number(event.target.value))} type="number" placeholder="Pris" />
                        <TextField value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} type="text" placeholder="Url" />
                        <TextField value={stock} onChange={(event) => setStock(event.target.value === "" ? "" : Number(event.target.value))} type="number" placeholder="Stock" />
                        <Button sx={{ border: "0.1rem solid grey" }} type="submit">Skicka</Button>
                    </Box>
                </Container>

                {/* Produkt listan här */}
                <Box component={"section"} sx={{background: "lightblue", border: "0.1rem solid black", borderRadius: "2rem", padding: "1rem", maxHeight: "30rem", boxSizing: "border-box", overflowY: "auto"}}>
                    {getQuery.data?.map((product: Product) => (
                        <article key={product.id}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                                <FormControlLabel label="" key={product.id} control={<Checkbox checked={checkedIds.includes(product.id)} onChange={(event) => handleChecked(product.id, event?.target.checked)} />} />
                                <Button onClick={() => handleRemoveProduct(product.id)} disabled={!checkedIds.includes(product.id)} sx={{ border: "0.1rem solid grey" }} >Ta bort</Button>
                            </Box>
                            <h2>Titel: {product.title} </h2>
                            <p>Beskrivning: {product.description}</p>
                            <p>Pris: {product.price}</p>
                            <p>Stock: {product.stock}</p>
                        </article>
                    ))}
                </Box>
            </Box>
        </>
    );
}
