import { component$ } from "@builder.io/qwik";
import { useCart } from "~/hooks/useCart";
import { ShowPrice } from "../shared/show-price/show-price";
import { Button } from "../shared/button/button";

export const CartResume = component$(() => {
  const { cart, removeFromCart, total, clearCart } = useCart();
  return (
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.orderItems.map((item) => (
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      {item.product.image && (
                        <img
                          src={item.product.image}
                          class="h-full w-full object-cover object-center"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{item.product.name}</div>
                    <div class="text-sm opacity-50">Variation</div>
                  </div>
                </div>
              </td>
              <td>{item.quantity}</td>
              <td>
                <ShowPrice price={item.product.price} />
              </td>
              <th>
                <Button
                  text="remove"
                  onClick$={() => removeFromCart(item.product)}
                />
              </th>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});
