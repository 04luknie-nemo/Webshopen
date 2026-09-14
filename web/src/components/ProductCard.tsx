import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router";
import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";
import { type Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "345px",
        height: "30rem",
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        height="200"
        image={product.imageUrl}
        sx={{ height: "15rem" }}
      />

      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>

        <Typography sx={{ mt: "auto", fontWeight: "bold" }}>
          {product.price} sek
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => {
            addToCart(product);
            showToast(`${product.title} har lagts till i kundvagnen`);
          }}
        >
          Buy
        </Button>

        <Button
          component={RouterLink}
          to={`/product/${product.id}`}
          size="small"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
