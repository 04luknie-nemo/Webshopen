import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./mainLayout";
import AdminPage from "./pages/adminPage";
import CheckoutPage from "./pages/checkoutPage";
import ConfirmationPage from "./pages/confirmationPage";
import HomePage from "./pages/homePage";
import ProductDetailPage from "./pages/productDetailPage";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetailPage />}
                        />
                        <Route
                            path="/confirmation"
                            element={<ConfirmationPage />}
                        />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
