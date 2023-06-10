import { component$, Slot } from "@builder.io/qwik";
import { AuthProvider } from "~/context/auth/auth-provider";

export default component$(() => {
  return (
    <AuthProvider>
      <div class="w-2/4 mx-auto py-10">
        <Slot />
      </div>
    </AuthProvider>
  );
});
