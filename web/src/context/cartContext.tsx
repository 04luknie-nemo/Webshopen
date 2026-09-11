import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, Product } from "../types";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(product: Product) {
        setCartItems((items) => [
            ...items,
            {
                product: product,
                quantity: 1,
            },
        ]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}
