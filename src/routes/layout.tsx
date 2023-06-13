import { component$, Slot } from "@builder.io/qwik";
import { Footer } from "~/components/shared/footer/footer";
import { Nav } from "~/components/shared/nav/nav";
import { CartProvider } from "~/context/cart/cart-provider";
import { OrderProvider } from "~/context/cart/order-provider";

export default component$(() => {
  return (
    <CartProvider>
      <OrderProvider>
        <Nav />
        <div class=" pt-16">
          <Slot />
        </div>
        <Footer />
      </OrderProvider>
    </CartProvider>
  );
});
