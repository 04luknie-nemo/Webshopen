import { BrowserRouter, Route, Routes } from "react-router";
import AdminPage from "./pages/adminPage";
import CheckoutPage from "./pages/checkoutPage";
import ConfirmationPage from "./pages/confirmationPage";
import HomePage from "./pages/homePage";
import ProductDetailPage from "./pages/productDetailPage";

export default function App() {
  return (
    <>
        <AdminPage />
        <HomePage />
        <CheckoutPage />
        <ConfirmationPage />
        <ProductDetailPage />
    </>
  );
}
