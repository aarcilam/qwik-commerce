import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, server$ } from '@builder.io/qwik-city';
import { Product } from '@prisma/client';
import { ProductService } from '~/services/ProductService';
const productService = new ProductService();

export const useGetProducts = routeLoader$(async () => {
  return await productService.getProducts();
});

export default component$(() => {
  const products = useResource$(async ({ track }) => {
    return await productService.getProducts();
  }); 
  return (
    <>
      <h1>Shop</h1>
      <Resource
        value={products}
        onPending={() => <p>Loading...</p>}
        onResolved={(products) => (
          <>
            {products.map((product, i) => (
              <p key={i}>{product.name}</p>
            ))}
          </>
        )}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
