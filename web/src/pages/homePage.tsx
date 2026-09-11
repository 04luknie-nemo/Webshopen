import { Alert, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const getQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (getQuery.isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <Alert severity="error">{getQuery.error.message}</Alert>
      </Container>
    );
  }
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
      >
        Träningsprodukter
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {getQuery.data?.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              maxWidth: "350px",
              height: "465px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
