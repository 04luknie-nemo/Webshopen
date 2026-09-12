import { Hono } from "hono";
import { db } from "../../prisma/db.ts";



const orders = new Hono();

orders.get("/:id", async (c) => {
  const orderId = Number(c.req.param().id);
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      customer: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order) {
    return c.json("Not found", 404);
  }
  return c.json(order, 200);
});




orders.post("/", async (c) =>{
  const orderData = await c.req.json();
  const newOrder  = await db.order.create({data:{ 
    totalPrice: orderData.totalPrice,
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dagar framåt
    
        
        customer: {
          create: {
            fullName: orderData.customer.fullName,
            email: orderData.customer.email,
            phoneNumber: orderData.customer.phoneNumber,
            address: orderData.customer.address,
            zipcode: orderData.customer.zipCode,
            city: orderData.customer.city,
            country: orderData.customer.country,
          },
        },
    
       
        orderItems: {
          create: orderData.items.map((item: any) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    

  } 
    );
  return c.json(newOrder,201);
 
})


export default orders;