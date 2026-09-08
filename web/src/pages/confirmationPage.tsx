import { Card, CardContent, Container, Typography } from "@mui/material";
import { useParams } from "react-router";
import { mockOrder } from "../mockData";

export default function ConfirmationPage() {
  const { orderId } = useParams();

  return (
    <Container>
      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent sx={{textAlign: "center"}}>
          <Typography variant="h5" gutterBottom>
            Your order id: {orderId}
          </Typography>
          <ul>
            {mockOrder.items.map((item) => (
              <li key={item.product.id}>
                {item.product.title} Antal: {item.quantity}
                Price: {item.product.price * item.quantity}:sek
              </li>
            ))}
          </ul>
          Totala summan:{mockOrder.totalPrice}
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent sx={{textAlign: "center"}}>
          <Typography> Full Name: {mockOrder.customer.fullName}</Typography>
          <Typography>Address: {mockOrder.customer.address}</Typography>
          <Typography>Zip Code: {mockOrder.customer.zipCode}</Typography>
          <Typography>City: {mockOrder.customer.city}</Typography>
          <Typography>Country: {mockOrder.customer.country}</Typography>
          <Typography>Email:{mockOrder.customer.email}</Typography>
          <Typography>Phonenumber:{mockOrder.customer.phoneNumber}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
