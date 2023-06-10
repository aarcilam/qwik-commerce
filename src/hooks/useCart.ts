import { $, useComputed$, useContext } from "@builder.io/qwik";
import { Product } from "@prisma/client";
import { CartContext } from "~/context/cart/cart-provider";

export function useCart() {
  const cart = useContext(CartContext);

  const addToCart = $((product: Product) => {
    // TODO receive the variation to add to cart
    const existingItem = cart.orderItems.find(
      (item) => item.product === product
    );
    if (existingItem) {
      existingItem.quantity += 1;
      cart.orderItems = [...cart.orderItems];
    } else {
      cart.orderItems = [...cart.orderItems, { product, quantity: 1 }];
    }
    cart.lastAdded = { product, quantity: 1 };
    console.log(cart, product);
  });

  const removeFromCart = $((product: Product) => {
    const index = cart.orderItems.findIndex((item) => item.product === product);
    if (index !== -1) {
      cart.orderItems.splice(index, 1);
    }
    cart.orderItems = [...cart.orderItems];
  });

  const total = useComputed$(() => {
    return cart.orderItems
      .map((item) => item.product.price * item.quantity)
      .reduce((prev, current) => {
        return prev + current;
      }, 0);
  });

  const count = useComputed$(() => {
    return cart.orderItems
      .map((item) => item.quantity)
      .reduce((prev, current) => {
        return prev + current;
      }, 0);
  });

  const clearCart = $(() => {
    cart.orderItems = [];
  });

  return {
    cart: cart,
    addToCart,
    removeFromCart,
    total,
    count,
    clearCart,
  };
}
