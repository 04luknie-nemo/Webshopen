import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router";
import { type Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.title}
        height="200"
        image={product.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          {product.price} sek
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
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
