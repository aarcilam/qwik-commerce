import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, server$ } from '@builder.io/qwik-city';
import { Product } from '@prisma/client';
import { Product as ProductComponent } from '~/components/product/product';
import { ProductService } from '~/services/ProductService';


export const useGetProducts = routeLoader$(async () => {
  const productService = new ProductService();
  return await productService.getProducts();
});

export default component$(() => {
  const products = useResource$(async ({ track }):Promise<Product[]> => {
    const productService = new ProductService();
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
              <ProductComponent {...product} />
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
