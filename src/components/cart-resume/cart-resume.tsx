import { component$ } from "@builder.io/qwik";
import { useCart } from "~/hooks/useCart";
import { ShowPrice } from "../shared/show-price/show-price";
import { Button } from "../shared/button/button";

export const CartResume = component$(() => {
    const {cart,removeFromCart} = useCart();
    return (<div>
        {cart.products.map(product=>(
            <div>{product.name} - <ShowPrice price={product.price}/> - <Button text="remove" onClick$={()=>removeFromCart(product)} /></div>
        ))}
    </div>);
});