import { Card, CardContent, Container, Typography } from "@mui/material";
import { initialCartItems } from "../mockData";

export default function CheckoutPage() {
  let totalAmount = 0;
  for (const item of initialCartItems) {
    totalAmount += item.product.price * item.quantity;
  }
  return (
    <Container>
      <Typography align="center">Checkout</Typography>

      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent>
          <ul>
            {initialCartItems.map((item) => (
              <li key={item.product.id}>
                {item.product.title} Antal: {item.quantity}
                Price: {item.product.price * item.quantity}:sek
              </li>
            ))}
          </ul>
          Totala summan:{totalAmount}
        </CardContent>
      </Card>
    </Container>
  );
}
