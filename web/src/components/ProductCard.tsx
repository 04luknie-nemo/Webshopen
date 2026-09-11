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
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        alt={product.title}
        image={product.imageUrl}
        sx={{ height: "200px", width: "100%", objectFit: "cover" }}
      />
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>
        <Typography sx={{ mt: "auto", pt: 2, fontWeight: "bold" }}>
          {product.price.toLocaleString("sv-SE")} sek
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
