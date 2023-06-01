import { component$, Slot } from '@builder.io/qwik';
import { AuthProvider } from '~/context/auth/auth-provider';

export default component$(() => {

  return (
  <AuthProvider>
    <Slot />
  </AuthProvider>);
});
