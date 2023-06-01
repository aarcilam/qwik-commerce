import { component$, createContextId, Signal, Slot, useContextProvider, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const JwtContext = createContextId<Signal<string>>(
  'docs.jwt-context'
);

export default component$(() => {

  const tokenSignal = useSignal<string>('');
  useContextProvider(JwtContext, tokenSignal);

  useVisibleTask$(()=>{
    const token = localStorage.getItem('jwtToken');
    tokenSignal.value = token? token: '';
  });
  
  return <>
  <h1>authed</h1>
   <Slot />
  </>;
});
