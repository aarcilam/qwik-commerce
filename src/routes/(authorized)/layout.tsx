import { Slot, component$ } from '@builder.io/qwik';
import { AuthProvider } from '~/context/auth/auth-provider';

export default component$(() => {
  
  return (
  <AuthProvider>
    <h1>authed</h1>
    <Slot />
  </AuthProvider>
  );
});
