import { Box, Button, TextField } from "@mui/material";
import { useState, type SubmitEvent } from "react";
import type { Product } from "../types";

type Props = {
  onSubmit: (data: Omit<Product, "id">) => void;
};

export default function AdminProductForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState<number | "">("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (stock === "" || price === "") return;

    // Startar POST-anropet med datan från formuläret
    onSubmit({
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
    <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <TextField
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="Titel"
      />
      <TextField
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        type="text"
        placeholder="Beskrivning"
      />
      <TextField
        value={price}
        onChange={(event) =>
          setPrice(event.target.value === "" ? "" : Number(event.target.value))
        }
        type="number"
        placeholder="Pris"
      />
      <TextField
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        type="text"
        placeholder="Url"
      />
      <TextField
        value={stock}
        onChange={(event) =>
          setStock(event.target.value === "" ? "" : Number(event.target.value))
        }
        type="number"
        placeholder="Stock"
      />
      <Button sx={{ border: "0.1rem solid grey" }} type="submit">
        Skicka
      </Button>
    </Box>
  );
}
