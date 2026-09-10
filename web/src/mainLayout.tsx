import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            En liten webbshop för en stor kropp 💪🏼
          </Typography>
          <Button
            variant="contained"
            // Theme provider ska läggas till, kommer i annat issue
            color="secondary"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            variant="contained"
            // Theme provider ska läggas till, kommer i annat issue
            color="secondary"
            component={RouterLink}
            to="/admin"
          >
            Admin
          </Button>
          <IconButton component={RouterLink} to="/checkout">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component={"main"} sx={{ flex: 1 }}>
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
