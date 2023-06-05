import { Slot, component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import { Product } from "@prisma/client";

export const CartContext = createContextId<Product[]>(
    'cart.cart-context'
);

export const CartProvider = component$(() => {
    const cart:Product[] = useStore([]);
    useContextProvider(CartContext, cart);

    return <Slot />
});