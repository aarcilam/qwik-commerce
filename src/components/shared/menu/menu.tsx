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
        <Link href="/shop" class=" text-sm font-medium transition-colors duration-200 ease-out mx-1" aria-expanded="false">Shop</Link>
        {
            categories.value.map((category: any) => (
                <Link href={"/shop/category/"+category.id} class=" text-sm font-medium transition-colors duration-200 ease-out mx-1" aria-expanded="false">{category.name}</Link>
            ))
        }
    </>)
});