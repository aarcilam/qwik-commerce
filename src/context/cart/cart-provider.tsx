import { Slot, component$, createContextId, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Product } from "@prisma/client";

export const CartContext = createContextId<CartStore>(
    'cart.cart-context'
);

interface CartStore{
    products:Product[]
}

export const CartProvider = component$(() => {
    const cart:CartStore = useStore({
        products: []
    });
    useContextProvider(CartContext, cart);

    useVisibleTask$(()=>{
        const stringCart = localStorage.getItem('cart');
        if(stringCart) {
            // console.log(JSON.parse(stringCart));
            // cart.products = JSON.parse(stringCart).products;
        }
    });

    useVisibleTask$(({track})=>{
        track(() => cart.products);
        console.log(cart.products);
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    return <Slot />
});