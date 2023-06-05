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
    console.log(endOfPage.value);
  })
  return (
    <>
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
