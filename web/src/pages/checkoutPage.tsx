import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCart } from "../context/cartContext";
import {
  CheckoutSchema,
  type CheckoutInput,
} from "../schemas/checkout";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
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
    navigate("/confirmation/" + newOrder.id);
  }

  return (
    <Container>
      <Typography align="center">Checkout</Typography>

      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                {item.product.title} Antal: {item.quantity}
                Price: {item.product.price * item.quantity}:sek
              </li>
            ))}
          </ul>
          Totala summan:{totalAmount}
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
