import {
  Resource,
  component$,
  $,
  useVisibleTask$,
  useTask$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Product as ProductComponent } from "~/components/product/product";
import { ProductsCollection } from "~/components/products-collection/products-collection";
import { useProducts } from "~/hooks/useProducts";
import { useScroll } from "~/hooks/useScroll";

export default component$(() => {
  const { take, skip, productsStore, getProducts } = useProducts();
  const { endOfPage } = useScroll();
  useTask$(async ({ track }) => {
    track(() => endOfPage.value);
    const products = await getProducts();
    productsStore.products = [...productsStore.products, ...products];
    if (endOfPage.value) {
      console.log(endOfPage.value);
      skip.value += take.value;
    }
  });
  return (
    <div>
      <ProductsCollection products={productsStore.products} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Shop",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
