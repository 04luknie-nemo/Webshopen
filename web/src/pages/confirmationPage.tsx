import { Card, CardContent, Container, Typography } from "@mui/material";
import { useParams } from "react-router";
//import { mockOrder } from "../mockData";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const { orderNumber } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      setOrder(null);
      setError("");
      try {
        const res = await fetch("/v1/orders/" + orderNumber);
        if (!res.ok) {
          setError(
            res.status === 404
              ? "Ordern finns inte."
              : "Kunde inte hämta ordern.",
          );
          return;
        }
        const data = await res.json();
        setOrder(data);
      } catch {
        setError("Kunde inte hämta ordern.");
      }
    }
    fetchOrder();
  }, [orderNumber]);
  if (error) {
    return (
      <Container>
        <Card sx={{ maxWidth: 500, mx: "auto" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">{error}</Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
  if (!order) {
    return (
      <Container>
        <Typography>Loading Order</Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Your order id: {orderNumber}
          </Typography>
          <ul>
            {order.orderItems.map((item: any) => (
              <li key={item.product.id}>
                {item.product.title} Antal: {item.quantity}
                Price: {item.product.price * item.quantity}:sek
              </li>
            ))}
          </ul>
          Totala summan:{order.totalPrice}
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography> Full Name: {order.customer.fullName}</Typography>
          <Typography>Address: {order.customer.address}</Typography>
          <Typography>Zip Code: {order.customer.zipcode}</Typography>
          <Typography>City: {order.customer.city}</Typography>
          <Typography>Country: {order.customer.country}</Typography>
          <Typography>Email:{order.customer.email}</Typography>
          <Typography>Phonenumber:{order.customer.phoneNumber}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
