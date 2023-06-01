import { Signal, Slot, component$, createContextId, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export const JwtContext = createContextId<Signal<string>>(
    'auth.jwt-context'
);

export const AuthProvider = component$(() => {
    const tokenSignal = useSignal<string>('');
    useContextProvider(JwtContext, tokenSignal);
    const loc = useLocation();
    const nav = useNavigate();

    useVisibleTask$(()=>{
        const token = localStorage.getItem('jwtToken');
        tokenSignal.value = token? token: '';
        if(token){
            if(loc.url.pathname.includes('login') || loc.url.pathname.includes('register')){
                nav('/profile')
            }
        }
    });
    return <Slot />
});