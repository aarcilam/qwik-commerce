import { component$, useContext, $, useSignal, useTask$ } from "@builder.io/qwik";
import { useCart } from "~/hooks/useCart";
import { ShowPrice } from "../show-price/show-price";
import { CartResume } from "~/components/cart-resume/cart-resume";
import { Link } from "@builder.io/qwik-city";
import { Menu } from "../menu/menu";
import { ThemeContext } from "~/root";

export const Nav = component$(() => {
  const cartRef = useSignal<HTMLInputElement>();

  const cart = useCart();
  const theme = useContext(ThemeContext);
  const changeTheme = $((checked: boolean) => {
    if (checked) theme.value = "night";
    if (!checked) theme.value = "winter";
  });

  useTask$(({ track }) => {
    track(() => cart.cart.lastAdded)
    cartRef.value?.focus();
  })
  return (
    <div class="navbar bg-base-100 fixed w-full top-0 left-0 z-40">
      <div class="drawer flex-1 block md:hidden">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for="my-drawer" class="btn btn-circle swap swap-rotate drawer-button">
            <input type="checkbox" />
            <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
            <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
          </label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay"></label>
          <div class="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <Menu />
          </div>
        </div>
      </div>
      <Link href="/" class="btn btn-ghost normal-case text-xl">
        <img
          class="h-8 w-auto"
          src="https://s3-alpha.figma.com/hub/file/2649946739/f6a7462a-0e1d-42d2-81aa-548a5dbce420-cover.png"
          alt=""
        />
      </Link>
      <div class="flex-1 hidden md:block">
        <Menu />
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle" ref={cartRef}>
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="badge badge-secondary badge-sm indicator-item">
                {cart.count.value}
              </span>
            </div>
          </label>
          <div
            tabindex="0"
            class="mt-3 card card-compact dropdown-content w-screen md:w-fit bg-base-100 shadow z-50"
          >
            <div class="card-body">
              <span class="font-bold text-lg">{cart.count.value} Items</span>
              <div class=" max-h-96 overflow-y-scroll ">
                <CartResume />
              </div>
              <div class="card-actions">
                {/* <Link href="/shop/cart" class="btn btn-primary btn-block">
                  View cart
                </Link> */}
                <Link href="/shop/checkout" class="btn btn-primary btn-block">
                  Make an order
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="swap swap-rotate">
            <input
              type="checkbox"
              onChange$={(event) => changeTheme(event.target.checked)}
            />
            <svg
              class="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              class="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
});
