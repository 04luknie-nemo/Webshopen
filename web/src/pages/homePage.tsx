import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { initialProducts } from "../mockData";
export default function HomePage() {
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
        {initialProducts.map((product) => (
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
