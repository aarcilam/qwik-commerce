import { component$, $, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, z } from '@builder.io/qwik-city';
import { InitialValues, SubmitHandler, formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import { UserService } from '~/services/UserService';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { TextInput } from '~/components/shared/forms/text-input/text-input';
import { ButtonInput } from '~/components/shared/forms/button-input/button-input';

// Objeto Validador
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
// Typado basado en el validador Modelo de entrada
type RegisterForm = z.infer<typeof registerSchema>;

// Modelo de salida
type ResponseData = {
    token: string,
    user: User
};

// Estado inicial de los valores
export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => ({
    name: '',
    email: '',
    password: '',
}));

// accion usa al enviar el form
export const useFormAction = formAction$<RegisterForm, ResponseData>(async (values) => {
    try {
        const userService = new UserService();
        const registerUser:User = await userService.createUser({
            ...values,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const token = jwt.sign({id: registerUser.id,email: registerUser.email,},"S3CR3T0");

        return {
            status: 'success',
            message: 'You are now logged in.',
            data: {
                token,
                user: registerUser
            }
        };
    } catch (error) {
        return {
        status: 'error',
        message: 'error'
        };
    }
}, zodForm$(registerSchema));

export default component$(() => {
    const [registerForm, { Form, Field }] = useForm<RegisterForm,ResponseData>({
        loader: useFormLoader(),
        action: useFormAction(),
        validate: zodForm$(registerSchema),
    });
    // atrapa el submit y el resultado de la accion
    const handleSubmit: SubmitHandler<RegisterForm> = $((values, event) => {
        // Runs on client
        console.log(values);
    });

    useVisibleTask$(({ track }) => {
        track(() => registerForm.response);
        if(!registerForm.response.data) return;

        if(registerForm.response.status == "success"){
            alert("success");
            // Guardar el token en el almacenamiento local
            localStorage.setItem('jwtToken', registerForm.response.data.token);
        }
        console.log("useVisibleTask",registerForm.response.data.token);
        
    });

  return (
    <>
    {registerForm.response.status}
    <Form onSubmit$={handleSubmit}>
        <Field name="name">
            {(field, props) => (
                <TextInput 
                    props={props} 
                    type="name" 
                    field={field} 
                    placeholder='Insert a name'
                />
            )}
        </Field>
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
