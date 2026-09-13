import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router";
import { useCart } from "./context/cartContext";

export default function MainLayout() {
  const { totalCount } = useCart();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: { xs: "8rem", md: "4rem" },
        }}
      >
        <Toolbar
          sx={{
            gap: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            En liten webbshop för en stor kropp 💪🏼
          </Typography>
          <Box component={"article"} sx={{ display: "flex", gap: "1rem" }}>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/"
            >
              Home
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/admin"
            >
              Admin
            </Button>
            <IconButton component={RouterLink} to="/checkout">
              <Badge color="error" badgeContent={totalCount} sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.75rem",
                  height: 20,
                  minWidth: 20,
                  borderRadius: "100%",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  border: "0.15rem solid white",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }} >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component={"main"}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
      <Box
        component={"footer"}
        sx={{
          py: 2,
          textAlign: "center",
          backgroundColor: "grey",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <Typography>@2026 Webshoppen</Typography>
        <Typography>Email: olas.priv@gmail.com</Typography>
        <Typography>Email: mattias.priv@gmail.com</Typography>
        <Box
          component={"nav"}
          sx={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/about"
          >
            Om Oss
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/contact"
          >
            Kontakt
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/policy"
          >
            Retur/Policy
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
