import { Snackbar } from "@mui/material";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ToastContextType {
    showToast: (message: string) => void;
}
interface ToastProviderProps {
    children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: ToastProviderProps) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function showToast(message: string) {
        setMessage(message);
        setOpen(true);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }
    return context;
}
