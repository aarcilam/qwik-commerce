import { Slot, component$, createContextId, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Product } from "@prisma/client";

export const CartContext = createContextId<CartStore>(
    'cart.cart-context'
);

export interface CartItem{
    product:Product,
    quantity: number
}

interface CartStore{
    orderItems: CartItem[]
}

export const CartProvider = component$(() => {
    const cart:CartStore = useStore({
        orderItems: []  
    });
    useContextProvider(CartContext, cart);

    useVisibleTask$(() => {
        const stringCart = localStorage.getItem('cart');
        console.log(stringCart);
        if (stringCart) {
            console.log(JSON.parse(stringCart));
            const parsedCart = JSON.parse(stringCart);
            cart.orderItems = parsedCart.orderItems;
        }
    });

    useVisibleTask$(({ track }) => {
        track(() => cart.orderItems);
        console.log(cart.orderItems);
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    return <Slot />
});