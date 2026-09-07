import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type SubmitEvent } from "react";
import type { Product } from "../types";

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

export default function AdminPage() {
  // State för varje formulärfält
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState<number | "">("");

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
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "lightblue",
          width: "20rem",
          margin: "0 auto",
          gap: "1rem",
        }}
      >
        <input
          style={{ border: "0.15rem solid black" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="titel"
        />
        <input
          style={{ border: "0.15rem solid black" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="beskrivning"
        />
        <input
          style={{ border: "0.15rem solid black" }}
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          type="number"
          placeholder="pris"
        />
        <input
          style={{ border: "0.15rem solid black" }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          placeholder="url"
        />
        <input
          style={{ border: "0.15rem solid black" }}
          value={stock}
          onChange={(e) =>
            setStock(e.target.value === "" ? "" : Number(e.target.value))
          }
          type="number"
          placeholder="stock"
        />
        <button style={{ border: "0.15rem solid black" }} type="submit">
          Submit
        </button>
      </form>
      {/* Debug visning av data så man ser direkt ny product */}
      <section>
        {getQuery.data?.map((product: Product) => (
          <article key={product.id}>
            <h2>{product.title} </h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </article>
        ))}
      </section>
    </>
  );
}
