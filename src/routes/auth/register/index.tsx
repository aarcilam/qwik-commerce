import { component$, $ } from '@builder.io/qwik';
import { DocumentHead, routeAction$, routeLoader$, server$, z } from '@builder.io/qwik-city';
import { InitialValues, SubmitHandler, formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import { UserService } from '~/services/UserService';

const registerSchema = z.object({
    name: z
        .string()
        .min(1, 'Please enter your name.'),
    email: z
        .string()
        .min(1, 'Please enter your email.')
        .email('The email address is badly formatted.'),
    password: z
        .string()
        .min(1, 'Please enter your password.')
        .min(8, 'You password must have 8 characters or more.'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => ({
    name: '',
    email: '',
    password: '',
}));

export const useFormAction = formAction$(async (values:RegisterForm) => {
    // Runs on server
    const userService = new UserService();
    const registerUser = await userService.createUser({...values,createdAt: new Date(),updatedAt: new Date()});
    console.log(registerUser);
}, zodForm$(registerSchema));
   
  
export default component$(() => {
    const [registerForm, { Form, Field, FieldArray }] = useForm<RegisterForm>({
        loader: useFormLoader(),
        action: useFormAction(),
        validate: zodForm$(registerSchema),
    });

    const handleSubmit: SubmitHandler<RegisterForm> = $((values, event) => {
        // Runs on client
        console.log(values,event);
      });
  return (
    <Form onSubmit$={handleSubmit}>
    <Field name="name">
        {(field, props) => (
        <div>
            <input {...props} type="name" value={field.value} />
            {field.error && <div>{field.error}</div>}
        </div>
        )}
    </Field>
    <Field name="email">
        {(field, props) => (
        <div>
            <input {...props} type="email" value={field.value} />
            {field.error && <div>{field.error}</div>}
        </div>
        )}
    </Field>
    <Field name="password">
        {(field, props) => (
        <div>
            <input {...props} type="password" value={field.value} />
            {field.error && <div>{field.error}</div>}
        </div>
        )}
    </Field>
    <input type="submit" />
    </Form>
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
