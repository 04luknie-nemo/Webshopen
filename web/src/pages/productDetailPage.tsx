import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useCart } from "../context/cartContext";
import { initialProducts } from "../mockData";

export default function ProductDetailPage() {
    const { addToCart } = useCart();
    const { id } = useParams();
    const productId = Number(id);

    const product = initialProducts.find((product) => product.id === productId);

    if (!product) {
        return (
            <Container sx={{ py: 4 }}>
                <Typography>Produkten hittades inte.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                    <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.title}
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            height: { xs: 260, md: 400 },
                            objectFit: "contain",
                            borderRadius: 2,
                        }}
                    />

                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Typography variant="h4" component="h1">
                            {product.title}
                        </Typography>

                        <Typography color="text.secondary">
                            {product.description}
                        </Typography>

                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {product.price} kr
                        </Typography>

                        <Typography
                            color={
                                product.stock > 0
                                    ? "success.main"
                                    : "error.main"
                            }
                        >
                            {product.stock > 0
                                ? `${product.stock} st i lager`
                                : "Slut i lager"}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => addToCart(product)}
                            disabled={product.stock <= 0}
                        >
                            Lägg i kundvagn
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}
