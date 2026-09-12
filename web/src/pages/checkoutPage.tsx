import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/cartContext";



export default function CheckoutPage() {
  const {cartItems, clearCart} = useCart();
  const navigate = useNavigate();
  let totalAmount = 0;
  for (const item of cartItems) {
    totalAmount += item.product.price * item.quantity;
  }
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const customerData = Object.fromEntries(new FormData(event.currentTarget));
    
    const orderPayload={
      customer: customerData,
      items: cartItems,
      totalPrice: totalAmount,
    };
    const res = await fetch("/v1/orders",{
      method: "Post",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(orderPayload)
    
    });
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
          <Box component="form" onSubmit={handleSubmit}>
            <TextField name="fullName" label="FullName"></TextField>
            <TextField name="address" label="Address"></TextField>
            <TextField name="zipCode" label="ZipCode"></TextField>
            <TextField name="city" label="City"></TextField>
            <TextField name="country" label="Country"></TextField>
            <TextField name="phoneNumber" label="Phonenumber"></TextField>
            <TextField name="email" label="Email"></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Confirm Order
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
