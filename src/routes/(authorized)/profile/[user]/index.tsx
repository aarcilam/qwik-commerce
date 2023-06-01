import { component$, useContext } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import { JwtContext } from '../../layout';

export default component$(() => {
    const token = useContext(JwtContext);
    const loc = useLocation();
    return <div>User {loc.params.user}!{token.value}</div>;
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
