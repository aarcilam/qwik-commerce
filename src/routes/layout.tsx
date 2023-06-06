import { component$, Slot } from '@builder.io/qwik';
import { Nav } from '~/components/shared/nav/nav';
import { CartProvider } from '~/context/cart/cart-provider';

export default component$(() => {
  return (
    <CartProvider>
        <Nav />
        <div class=" pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Slot />
        </div>
    </CartProvider>
  );
});
