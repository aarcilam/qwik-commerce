import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return <>
  <h1>authed</h1>
   <Slot />
  </>;
});
