import { Resource, component$, useOnDocument, $, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Product as ProductComponent } from '~/components/product/product';
import { useProducts } from '~/hooks/useProducts';
import { useScroll } from '~/hooks/useScroll';


export default component$(() => {
  const {productsResource} = useProducts();
  const {endOfPage} = useScroll();
  useVisibleTask$(({track})=>{
    track(()=>endOfPage.value);
    // TODO when this track fires get new products need a signal to save the actual offset 
    console.log(endOfPage.value);
  })
  return (
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1>Shop</h1>
      <Resource
        value={productsResource}
        onPending={() => <p>Loading...</p>}
        onResolved={(products) => (
          <div class="flex">
            {products.map((product, i) => (
              <div class="w-1/3">
                <ProductComponent product={product} />
              </div>
            ))}
          </div>
        )}
      />
    </div>
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
