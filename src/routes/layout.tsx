import { component$, Slot } from '@builder.io/qwik';
import { Nav } from '~/components/shared/nav/nav';
import { CartProvider } from '~/context/cart/cart-provider';

export default component$(() => {
  return (
    <CartProvider>
        <Nav />
        <div>
          <Slot />
        </div>
    </CartProvider>
  );
});
