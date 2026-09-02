import { Container, Typography } from "@mui/material";
import { initialProducts } from "../mockData";
export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Träningsprodukter
      </Typography>
      <ul>
        {initialProducts.map((product) => (
          <li key={product.id}>
            {product.title}
            {product.price}:-kr
          </li>
        ))}
      </ul>
    </Container>
  );
}
