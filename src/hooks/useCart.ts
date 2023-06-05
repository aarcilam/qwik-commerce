import { $, useComputed$, useContext } from "@builder.io/qwik"
import { Product } from "@prisma/client";
import { CartContext } from "~/context/cart/cart-provider"

export function useCart(){
    const cartContext = useContext(CartContext);

    const addToCart = $((product:Product) => {
        console.log(cartContext,product);
        cartContext.products = [...cartContext.products, product];
    });

    const removeFromCart = $((product: Product) => {
        const index = cartContext.products.findIndex((p) => p === product);
        if (index !== -1) {
          cartContext.products.splice(index, 1);
        }
        cartContext.products = [...cartContext.products];
    });
    
    const total = useComputed$(() => {
        return cartContext.products.map(product=>product.price).reduce((prev,current)=>{return prev + current},0);
    });

    const count = useComputed$(() => {
        return cartContext.products.length;
    });

    return{
        cart: cartContext,
        addToCart,
        removeFromCart,
        total,
        count
    }
}