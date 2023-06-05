import { component$ } from "@builder.io/qwik";
import { useCart } from "~/hooks/useCart";
import { ShowPrice } from "../show-price/show-price";

export const Nav = component$(() => {
    const cart = useCart();
    return (
    <header>
        <div>cart: {cart.count.value} <ShowPrice price={cart.total.value}></ShowPrice></div>
    </header>)
});