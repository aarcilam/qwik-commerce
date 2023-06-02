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
        if(tokenSignal.value!=''){
            if(loc.url.pathname.includes('login') || loc.url.pathname.includes('register')){
                nav('/profile')
            }
        }else{
            nav('/auth/login')
        }
    });

    useVisibleTask$(({track})=>{
        track(() => tokenSignal.value);
        // Guardar el token en el almacenamiento local
        localStorage.setItem('jwtToken', tokenSignal.value);
    })
    return <Slot />
});