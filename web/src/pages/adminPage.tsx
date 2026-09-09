import { Box, Container } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/products";
import AdminProductForm from "../components/AdminProductForm";
import { AdminProductList } from "../components/AdminProductList";

export default function AdminPage() {
  // queryClient ger tillgång till react-query cachen,
  // används för att tvinga fram en ny hämtning senare
  const queryClient = useQueryClient();

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
            <p>
              Något gick fel med att lägga till produkt:{" "}
              {(addProductMutation.error as Error).message}
            </p>
          )}
        </Container>

        {/* Produkt listan här */}
        <AdminProductList />
      </Box>
    </>
  );
}
