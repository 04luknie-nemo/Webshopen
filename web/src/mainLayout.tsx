import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router";

export default function MainLayout() {
  return (
    <>
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
          <IconButton component={RouterLink} to="/checkout">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
