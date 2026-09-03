import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
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
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/checkout"
          >
            Checkout
          </Button>

          <IconButton
            component={RouterLink}
            to="/"
            onClick={() => {
              alert("Ej implementerad än");
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>A</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
