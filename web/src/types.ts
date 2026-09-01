export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    imageUrl: string,
    stock: number
}

export interface Customer {
    id: number,
    fullName: string,
    email: string,
    phoneNumber: string, 
    address: string,
    zipCode: string,
    city: string,
    country: string
}

export interface OrderItem {
    productId: number,
    orderId: number,
    price: number,
    quantity: number
}

export interface CartItem {
    product: Product,
    quantity: number
}

export interface Order {
    id: number,
    totalPrice: number
    createdAt: Date,
    estimatedDelivery: Date,
    customer: Customer
}
// export interface Person {
// }
// export interface Admin extends Person {
    
// }