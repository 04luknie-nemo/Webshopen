import { Alert, Box, Button, Checkbox, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAllProducts, removeProduct } from "../api/products";
import type { Product } from "../types";

export function AdminProductList() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const getQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // queryClient ger tillgång till react-query cachen,
  // används för att tvinga fram en ny hämtning senare
  const queryClient = useQueryClient();

  const removeProductMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setCheckedIds((prev) => prev.filter((id) => id !== productId));
    },
  });

  function handleCheckedBox(productId: number, checked: boolean) {
    setCheckedIds((prev) =>
      checked
        ? [...prev, productId]
        : prev.filter((itemId) => itemId !== productId),
    );
  }

  function handleRemoveProduct(productId: number) {
    removeProductMutation.mutate(productId);
  }
  if (getQuery.isError) {
    return (
      <Alert severity="error">Något gick fel: {getQuery.error.message}</Alert>
    );
  }
  if (!getQuery.data || getQuery.data.length === 0) {
    return null;
  }
  return (
    <Box
      component={"section"}
      sx={{
        background: "lightblue",
        border: "0.1rem solid black",
        borderRadius: "2rem",
        padding: "1rem",
        maxHeight: "30rem",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {getQuery.data?.map((product: Product) => (
        <Box component={"article"} key={product.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Checkbox
              checked={checkedIds.includes(product.id)}
              onChange={(_, checked) => handleCheckedBox(product.id, checked)}
            />

            <Button
              onClick={() => handleRemoveProduct(product.id)}
              disabled={!checkedIds.includes(product.id)}
              variant="outlined"
              color="error"
            >
              Ta bort
            </Button>
          </Box>
          <Typography variant="h6">Titel: {product.title} </Typography>
          <Typography variant="body2">
            Beskrivning: {product.description}
          </Typography>
          <Typography variant="body2">Pris: {product.price}</Typography>
          <Typography variant="body2">Stock: {product.stock}</Typography>
        </Box>
      ))}
    </Box>
  );
}
