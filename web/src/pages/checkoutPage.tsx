import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCart } from "../context/cartContext";
import { CheckoutSchema, type CheckoutInput } from "../schemas/checkout";

export default function CheckoutPage() {
  const { cartItems, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(CheckoutSchema),
  });

  let totalAmount = 0;
  for (const item of cartItems) {
    totalAmount += item.product.price * item.quantity;
  }

  async function handleOrderSubmit(customerData: CheckoutInput) {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderPayload = {
      customer: customerData,
      items: cartItems,
      totalPrice: totalAmount,
    };

    const res = await fetch("/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      alert("Failed to place order. Please try again.");
      return;
    }

    const newOrder = await res.json();
    clearCart();
    navigate("/confirmation/" + newOrder.orderNumber);
  }

  return (
    <Container>
      <Typography align="center">Checkout</Typography>
      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              maxHeight: "420px",
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            {" "}
            {cartItems.map((item, index) => (
              <li key={item.product.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.product.title}
                    image={item.product.imageUrl}
                    sx={{
                      height: "4rem",
                      width: "5rem",
                      border: "0.1rem solid black",
                      borderRadius: "1.5rem",
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" noWrap>
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2">
                      Antal: {item.quantity}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ mt: "auto", fontWeight: "bold" }}>
                      {(item.product.price * item.quantity).toLocaleString(
                        "sv-SE",
                      )}{" "}
                      sek
                    </Typography>
                    <ButtonGroup size="small" variant="outlined">
                      <Button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        sx={{ height: "2rem", border: "0.1rem solid black" }}
                      >
                        <Box>+</Box>
                      </Button>
                      <Button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        sx={{ height: "2rem", border: "0.1rem solid black" }}
                      >
                        <Box>-</Box>
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Box>
                {index < cartItems.length - 1 && <Divider />}
              </li>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ mt: 2, fontWeight: "bold" }}>
            Totala summan: {totalAmount.toLocaleString("sv-SE")} sek
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 500, mx: "auto", mt: 3 }}>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit(handleOrderSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Full Name"
              autoComplete="name"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              fullWidth
            />
            <TextField
              label="Address"
              autoComplete="street-address"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
            />
            <TextField
              label="Zip Code"
              autoComplete="postal-code"
              {...register("zipCode")}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
              fullWidth
            />
            <TextField
              label="City"
              autoComplete="address-level2"
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
              fullWidth
            />
            <TextField
              label="Country"
              autoComplete="country-name"
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message}
              fullWidth
            />
            <TextField
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={cartItems.length === 0 || isSubmitting}
            >
              Confirm Order
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
