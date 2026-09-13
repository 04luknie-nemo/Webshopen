import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./context/cartContext.tsx";
import { ToastProvider } from "./context/toastContext.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <CartProvider>
                <ToastProvider>
                    <App />
                </ToastProvider>
            </CartProvider>
        </QueryClientProvider>
    </StrictMode>,
);
