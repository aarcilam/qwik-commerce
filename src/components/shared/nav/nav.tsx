import { component$ } from "@builder.io/qwik";
import { useCart } from "~/hooks/useCart";
import { ShowPrice } from "../show-price/show-price";
import { CartResume } from "~/components/cart-resume/cart-resume";
import { Link } from "@builder.io/qwik-city";
import { Menu } from "../menu/menu";

export const Nav = component$(() => {
    const cart = useCart();
    // TODO make dropdown cart with the cart resume component
    return (
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <Link href="/" class="btn btn-ghost normal-case text-xl">
                    <img class="h-8 w-auto" src="https://s3-alpha.figma.com/hub/file/2649946739/f6a7462a-0e1d-42d2-81aa-548a5dbce420-cover.png" alt="" />
                </Link>
                <Menu />
            </div>
            <div class="flex-none">
                <div class="dropdown dropdown-end">
                    <Link href="/shop/cart" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span class="badge badge-sm indicator-item">{cart.count.value}</span>
                        </div>
                    </Link>
                    <div class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div class="card-body">
                            <span class="font-bold text-lg">{cart.count.value} Items</span>
                            <span class="text-info">Subtotal: <ShowPrice price={cart.total.value}></ShowPrice></span>
                            <div class="card-actions">
                                <button class="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dropdown dropdown-end">
                    <label class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </label>
                    <ul class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )

});