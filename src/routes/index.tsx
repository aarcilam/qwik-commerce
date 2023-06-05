import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class=" text-4xl">Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Shop',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
