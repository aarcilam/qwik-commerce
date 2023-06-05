import { component$, Slot } from '@builder.io/qwik';
import { CartProvider } from '~/context/cart/cart-provider';

export default component$(() => {
  return (
    <CartProvider>
        <Slot />
    </CartProvider>
  );
});
