import { component$, $, useContext } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, useNavigate, z } from '@builder.io/qwik-city';
import { InitialValues, SubmitHandler, formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import { ButtonInput } from '~/components/shared/forms/button-input/button-input';
import { TextInput } from '~/components/shared/forms/text-input/text-input';
import { JwtContext } from '~/context/auth/auth-provider';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email.')
    .email('The email address is badly formatted.'),
  password: z
    .string()
    .min(1, 'Please enter your password.')
    .min(8, 'You password must have 8 characters or more.'),
});
 
type LoginForm = z.infer<typeof loginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: '',
  password: '',
}));

export const useFormAction = formAction$<LoginForm>((values) => {
  // Runs on server
}, zodForm$(loginSchema));
 
export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(loginSchema),
  });

  const handleSubmit: SubmitHandler<LoginForm> = $((values, event) => {
    // Runs on client
  });
  
  return (
    <>
       <Form onSubmit$={handleSubmit}>
        <Field name="email">
            {(field, props) => (
              <TextInput 
                props={props} 
                type="email" 
                field={field} 
                placeholder='Insert a valid email'
              />
            )}
        </Field>
        <Field name="password">
            {(field, props) => (
              <TextInput 
                props={props} 
                type="password" 
                field={field} 
                placeholder='Insert password'
              />
            )}
        </Field>
        <ButtonInput value='Register' />
    </Form>
    </>
  );
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
