import { Signal, Slot, component$, createContextId, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const JwtContext = createContextId<Signal<string>>(
    'auth.jwt-context'
);

export const AuthProvider = component$(() => {
    const tokenSignal = useSignal<string>('');
    useContextProvider(JwtContext, tokenSignal);

    useVisibleTask$(()=>{
        const token = localStorage.getItem('jwtToken');
        tokenSignal.value = token? token: '';
    });
    return <Slot />
});