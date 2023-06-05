import { Slot, component$, createContextId, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Product } from "@prisma/client";

export const CartContext = createContextId<CartStore>(
    'cart.cart-context'
);

interface CartStore{
    products:Product[],
    total: number,
}

export const CartProvider = component$(() => {
    const cart:CartStore = useStore({
        products: [],
        total: 0
    });
    useContextProvider(CartContext, cart);

    useVisibleTask$(()=>{
        const stringCart = localStorage.getItem('cart');
        // if(stringCart) cart.products.push(...JSON.parse(stringCart));
    });

    useVisibleTask$(({track})=>{
        track(() => cart.products);
        console.log(cart);
        // localStorage.setItem('cart', cart.toString());
    });

    return <Slot />
});