import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Order, OrderItem } from "@prisma/client";

export const OrderContext = createContextId<OrderStore>("order.order-context");

interface OrderStore {
  orderData: Omit<Order, "id" | "createdAt" | "updatedAt" | "userId">;
  orderItems: Omit<OrderItem, "id" | "variationId" | "orderId">[];
  shippingMethod: string;
  paymentId: string;
}

export const OrderProvider = component$(() => {
  const order: OrderStore = useStore({
    orderData: {
      email: "",
      country: "",
      name: "",
      address: "",
      addressComplement: "",
      city: "",
      department: "",
      postalCode: "",
      phone: "",
      total: 0,
    },
    orderItems: [],
    shippingMethod: "",
    paymentId: "",
  });
  useContextProvider(OrderContext, order);

  useVisibleTask$(() => {
    const stringOrder = localStorage.getItem("order");
    console.log(stringOrder);
    if (stringOrder) {
      console.log(JSON.parse(stringOrder));
      const parsedCart = JSON.parse(stringOrder);
      order.orderData = parsedCart.orderData;
      order.orderItems = parsedCart.orderItems;
      order.shippingMethod = parsedCart.shippingMethod;
      order.paymentId = parsedCart.paymentId;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => order.orderItems);
    console.log(order.orderItems);
    localStorage.setItem("order", JSON.stringify(order));
  });

  return <Slot />;
});
