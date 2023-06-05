import { Resource, component$ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import { Product } from '~/components/product/product';
import { useProducts } from '~/hooks/useProducts';

export default component$(() => {
    const loc = useLocation();
    const {productResource} = useProducts();
    const product = productResource(+loc.params.slug);
    return (
      <div>
        <Resource
          value={product}
          onPending={() => <p>Loading...</p>}
          onResolved={(product) => (
            <div>
              {product!=null && <Product product={product} />}
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
