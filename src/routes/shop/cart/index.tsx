import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { CartResume } from '~/components/cart-resume/cart-resume';

export default component$(() => {
  return (
    <>
      <CartResume />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Cart',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
