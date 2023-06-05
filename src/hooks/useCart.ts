import { $, useContext } from "@builder.io/qwik"
import { Product } from "@prisma/client";
import { CartContext } from "~/context/cart/cart-provider"

export function useCart(){
    const cartContext = useContext(CartContext);

    const addToCart = $((product:Product) => {
        console.log(cartContext,product);
        cartContext.products.push(product);
    });
    

    return{
        cart: cartContext,
        addToCart
    }
}