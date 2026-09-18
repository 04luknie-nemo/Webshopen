import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
//import { mockOrder } from "../mockData";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const { orderId } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      setOrder(null);
      setError("");
      try {
        const res = await fetch("/v1/orders/" + orderId);
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
  }, [orderId]);
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
    <Container
      sx={{
        marginTop: "1rem",
      }}
    >
      <Card component="section" sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent
          component="article"
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: "0.5rem",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your order id: {orderId}
          </Typography>
          <Stack spacing={1.5}>
            {order.orderItems.map((item: any) => {
              return (
                <Box
                  key={item.id ?? item.product.id}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    p: "0.75rem",
                    textAlign: "left",
                    transition: "box-shadow 0.2s",
                    "&:hover": {
                      boxShadow: 1,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={item.product.title}
                    image={item.product.imageUrl || "/placeholder.png"}
                    sx={{
                      width: "5rem",
                      height: "5rem",
                      borderRadius: 2,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Antal: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                    {(item.product.price * item.quantity).toLocaleString(
                      "sv-SE",
                    )}{" "}
                    kr
                  </Typography>
                </Box>
              );
            })}
          </Stack>
          <Box
            sx={{
              border: "0.1rem solid black",
              borderRadius: 3,
              padding: "0.2rem",
            }}
          >
            Totala summan: {order.totalPrice}
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
            Leveransadress
          </Typography>

          <Typography>{order.customer.fullName}</Typography>
          <Typography>{order.customer.address}</Typography>
          <Typography>
            {order.customer.zipcode} {order.customer.city}
          </Typography>
          <Typography>{order.customer.country}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary">
            Email: {order.customer.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Telefon: {order.customer.phoneNumber}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
