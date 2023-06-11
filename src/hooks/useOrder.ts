import { server$ } from "@builder.io/qwik-city";
import { Order, OrderItem } from "@prisma/client";
import { OrderService } from "~/services/OrderService";

export function useOrders() {
    const create = server$(async (orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "userId">,orderItemsData: Omit<OrderItem[], "id"|"variationId"|"orderId">) => {
        const orderService = new OrderService();
        const createdOrder = await orderService.createOrder(orderData,orderItemsData);
        return createdOrder;
    });

    return {
        create
    };
}
