import { Resource, component$ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import { ProductDetail } from '~/components/product-detail/product-detail';
import { useProducts } from '~/hooks/useProducts';

export default component$(() => {
    const loc = useLocation();
    const {getProduct} = useProducts();
    const product = getProduct(+loc.params.slug);
    return (
      <div>
        <Resource
          value={product}
          onPending={() => <p>Loading...</p>}
          onResolved={(product) => (
            <div>
              {product!=null && <ProductDetail product={product} />}
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
