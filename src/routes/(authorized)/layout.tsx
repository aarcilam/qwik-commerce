import { Slot, component$ } from '@builder.io/qwik';
import { Nav } from '~/components/shared/nav/nav';
import { AuthProvider } from '~/context/auth/auth-provider';
import { CartProvider } from '~/context/cart/cart-provider';

export default component$(() => {
  
  return (
  <AuthProvider>
    <CartProvider>
      <Nav />
      <h1>authed</h1>
      <Slot />
    </CartProvider>
  </AuthProvider>
  );
});
