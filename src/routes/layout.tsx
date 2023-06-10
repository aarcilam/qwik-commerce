import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/components/shared/footer/footer";
import { Nav } from "~/components/shared/nav/nav";
import { CartProvider } from "~/context/cart/cart-provider";

export default component$(() => {
  return (
    <CartProvider>
      <Nav />
      <div>
        <Slot />
      </div>
      <Footer />
    </CartProvider>
  );
});
