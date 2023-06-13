import {
  Signal,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Product } from "@prisma/client";

export const CartContext = createContextId<CartStore>("cart.cart-context");

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  orderItems: CartItem[];
  lastAdded: CartItem | null;
}

export const CartProvider = component$(() => {
  const cart: CartStore = useStore({
    orderItems: [],
    lastAdded: null,
  });
  useContextProvider(CartContext, cart);

  useVisibleTask$(() => {
    const stringCart = localStorage.getItem("cart");
    console.log(stringCart);
    if (stringCart) {
      console.log(JSON.parse(stringCart));
      const parsedCart = JSON.parse(stringCart);
      cart.orderItems = parsedCart.orderItems;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => cart.orderItems);
    console.log(cart.orderItems);
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.lastAdded != null) {
      setTimeout(() => {
        cart.lastAdded = null;
      }, 2000);
    }
  });

  return (
    <div>
      {cart.lastAdded != null && (
        // TODO change this to a component
        <Link href="/shop/cart" class="toast toast-top toast-end z-50 top-12">
          <div class="alert alert-success">
            <span>
              Added to cart {cart.lastAdded.quantity} -{" "}
              {cart.lastAdded.product.name}
            </span>
          </div>
        </Link>
      )}
      <Slot />
    </div>
  );
});
