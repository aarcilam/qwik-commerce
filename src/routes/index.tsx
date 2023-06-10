import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Hero } from "~/components/hero/hero";
import { ProductsCollection } from "~/components/products-collection/products-collection";

export default component$(() => {
  return (
    <div>
      <Hero></Hero>
      <ProductsCollection products={null} />
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
