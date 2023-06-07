import { Signal, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Category } from "@prisma/client";
import { useCategories } from "~/hooks/useCategories";

export const Menu = component$(() => {
    const {getCategories} = useCategories();
    const categories:Signal<Category[]> = useSignal([]);
    useTask$(async ({track})=>{
        const cats = await getCategories();
        categories.value = [...categories.value,...cats]
      })
    return( <>
        <Link href="/shop" class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out mx-1" aria-expanded="false">Shop</Link>
        {
            categories.value.map((category: any) => (
                <Link href={"/shop/category/"+category.id} class="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out mx-1" aria-expanded="false">{category.name}</Link>
            ))
        }
    </>)
});