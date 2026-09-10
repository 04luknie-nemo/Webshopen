import {
  Alert,
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addProduct, editProduct, getAllProducts } from "../api/products";
import AdminProductForm from "../components/AdminProductForm";
import { AdminProductList } from "../components/AdminProductList";
import type { ProductOutput } from "../schemas/product";

export default function AdminPage() {
  // queryClient ger tillgång till react-query cachen,
  // används för att tvinga fram en ny hämtning senare
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<number | null>(null);

  const getQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const editingProduct = getQuery.data?.find((p) => p.id === editingId) ?? null;

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
  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  function handleEditProduct(productId: number, data: ProductOutput) {
    editProductMutation.mutate({ productId, data });
  }
  return (
    <>
      <Box
        component={"main"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: "1",
          padding: "1rem",
          margin: "0",
          marginTop: "2rem",
        }}
      >
        <Dialog
          open={editingId !== null}
          onClose={() => setEditingId(null)}
          maxWidth="sm"
        >
          <DialogTitle>Redigera Product</DialogTitle>
          <DialogContent>
            {editingProduct && (
              <AdminProductForm
                defaultValues={editingProduct}
                onSubmit={(data) => {
                  handleEditProduct(editingProduct.id, data);
                  setEditingId(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
            width: "30rem",
          }}
        >
          <AdminProductForm
            onSubmit={(data) => addProductMutation.mutate(data)}
          />

          {addProductMutation.isError && (
            <Alert severity="error">
              Något gick fel med att lägga till produkt:{" "}
              {(addProductMutation.error as Error).message}
            </Alert>
          )}
        </Container>

        {/* Produkt listan här */}
        <AdminProductList
          products={getQuery.data}
          isError={getQuery.isError}
          error={getQuery.error}
          onEdit={setEditingId}
        />
      </Box>
    </>
  );
}
