import { Container, Typography, Grid } from "@mui/material";
import { initialProducts } from "../mockData";
import ProductCard from "../components/ProductCard";
export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Träningsprodukter
      </Typography>
      <Grid container spacing={2}>
        {initialProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>

            <ProductCard product={product}/>
           
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
