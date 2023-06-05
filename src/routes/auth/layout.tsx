import { component$, Slot } from '@builder.io/qwik';
import { AuthProvider } from '~/context/auth/auth-provider';

export default component$(() => {

  return (
  <AuthProvider>
    <div class=" pt-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Slot />
    </div>
  </AuthProvider>);
});
