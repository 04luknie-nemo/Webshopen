import { Link, Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div className="min-h-svh flex flex-col">
            <header className="p-2 bg-zinc-100 flex">
                <nav className="flex gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/product_detail">Product Detail Page</Link>
                    <Link to="/confirmation">Confirmation Page</Link>
                    <Link to="/checkout">Checkout Page</Link>
                    <Link to="/admin">Admin Page</Link>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}