import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, Product } from "../types";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    clearCart: () => void;
    totalCount: number;
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
    const totalCount:number = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    function clearCart(){
    setCartItems([]);   
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalCount }}>
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



