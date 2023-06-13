import { useContext, $ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";
import { Order, OrderItem } from "@prisma/client";
import { OrderContext } from "~/context/cart/order-provider";
import { OrderService } from "~/services/OrderService";
import { useCart } from "./useCart";

export function useOrders() {
    const order = useContext(OrderContext);
    const { cart, total } = useCart();

    const setOrderData = $((orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "userId">) => {
        orderData.total = total.value;
        order.orderData = orderData;
        order.orderItems = cart.orderItems.map(item => {
            return {
                quantity: item.quantity,
                productId: item.product.id,
            }
        });
        console.log("setOrderData",order);
    })

    const setShippingMethod = $((method:string)=>{
        order.shippingMethod = method;
    });

    const setPaymentId = $((paymentId:string)=>{
        order.paymentId = paymentId;
    });

    const create = server$(async (orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "userId">, orderItemsData: Omit<OrderItem[], "id" | "variationId" | "orderId">) => {
        const orderService = new OrderService();
        const createdOrder = await orderService.createOrder(orderData, orderItemsData);
        return createdOrder;
    });

    return {
        order,
        create,
        setOrderData,
        setShippingMethod,
        setPaymentId
    };
}
