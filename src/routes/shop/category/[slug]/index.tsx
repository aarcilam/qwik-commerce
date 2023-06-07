import { Signal, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Product } from '@prisma/client';
import { ProductsCollection } from '~/components/products-collection/products-collection';
import { useCategories } from '~/hooks/useCategories';

export default component$(() => {
    const loc = useLocation();
    const {getCategoryProducts} = useCategories();
    const products:Signal<Product[]> = useSignal([]);
    useTask$(async ({track})=>{
        const productsResponse = await getCategoryProducts(+loc.params.slug);
        if(productsResponse) products.value = [...productsResponse]
    })
    return (<>
        <ProductsCollection products={products.value} />
    </>)
});