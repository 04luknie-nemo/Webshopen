import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Alert, Container, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router";
import { getAllProducts } from "../api/products";
import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";
import type { Product } from "../types";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

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
                <Button
                    size="small"
                    onClick={() => {
                        addToCart(product);
                        showToast(
                            `${product.title} har lagts till i kundvagnen`,
                        );
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
        <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
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
                    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
