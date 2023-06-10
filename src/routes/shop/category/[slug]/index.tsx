import { Signal, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Product } from "@prisma/client";
import { ProductsCollection } from "~/components/products-collection/products-collection";
import { useCategories } from "~/hooks/useCategories";

export default component$(() => {
  const loc = useLocation();
  const { getCategoryProducts } = useCategories();
  const products: Signal<Product[]> = useSignal([]);
  useTask$(async ({ track }) => {
    track(() => loc.params.slug);
    if (loc.params.slug) {
      const productsResponse = await getCategoryProducts(+loc.params.slug);
      if (productsResponse) products.value = [...productsResponse];
    }
  });
  return (
    <>
      {products.value.length > 0 && (
        <ProductsCollection products={products.value} />
      )}
    </>
  );
});
