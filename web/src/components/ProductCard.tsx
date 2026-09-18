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
        height: "25rem",
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        image={product.imageUrl}
        sx={{ height: "15rem" }}
      />

      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
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
