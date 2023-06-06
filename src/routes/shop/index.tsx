import { Resource, component$, $, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Product as ProductComponent } from '~/components/product/product';
import { useProducts } from '~/hooks/useProducts';
import { useScroll } from '~/hooks/useScroll';


export default component$(() => {
  const {take,skip,productsStore,getProducts} = useProducts();
  const {endOfPage} = useScroll();
  useTask$(async ({track})=>{
    track(()=>endOfPage.value);
    const products = await getProducts();
    productsStore.products = [...productsStore.products,...products]
    if(endOfPage.value){
      skip.value += take.value;
    }
  })
  return (
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1>Shop</h1>
      <div class="flex flex-wrap">
      {
        productsStore.products.map(product=>(
          <div class="w-1/3">
            <ProductComponent product={product} />
          </div>
        ))
      }
      </div>
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
