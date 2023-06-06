import { $, useComputed$, useContext } from "@builder.io/qwik"
import { Product } from "@prisma/client";
import { CartContext } from "~/context/cart/cart-provider"

export function useCart(){
    const cart = useContext(CartContext);

    const addToCart = $((product:Product) => {
        console.log(cart,product);
        cart.orderItems = [...cart.orderItems, {product,quantity:1}];
    });

    const removeFromCart = $((product: Product) => {
        const index = cart.orderItems.findIndex((item) => item.product === product);
        if (index !== -1) {
          cart.orderItems.splice(index, 1);
        }
        cart.orderItems = [...cart.orderItems];
    });
    
    const total = useComputed$(() => {
        return cart.orderItems.map(item=>item.product.price).reduce((prev,current)=>{return prev + current},0);
    });

    const count = useComputed$(() => {
        return cart.orderItems.length;
    });

    return{
        cart: cart,
        addToCart,
        removeFromCart,
        total,
        count
    }
}