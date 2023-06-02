import { component$, $, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, useNavigate, z } from '@builder.io/qwik-city';
import { InitialValues, SubmitHandler, formAction$, useForm, zodForm$ } from '@modular-forms/qwik';
import { User } from '@prisma/client';
import { ButtonInput } from '~/components/shared/forms/button-input/button-input';
import { TextInput } from '~/components/shared/forms/text-input/text-input';
import { JwtContext } from '~/context/auth/auth-provider';
import { UserService } from '~/services/UserService';
import { LoggedUsedResponseData } from '../register';

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

export const useFormAction = formAction$<LoginForm,LoggedUsedResponseData>(async (values) => {
  // Runs on server
  try {
    const userService = new UserService();
    const loggedUser:User|null = await userService.getUserByEmail(values.email);
    if(loggedUser == null) return;
    const validatePass = await userService.validateUser(loggedUser,values.password);
    if(!validatePass){
      return {
        status: 'error',
        message: 'error'
        };
    }
    const token = userService.createToken(loggedUser.id,loggedUser.email);
    return {
        status: 'success',
        message: 'You are now logged in.',
        data: {
            token,
            user: loggedUser
        }
    };
} catch (error) {
    return {
    status: 'error',
    message: 'error'
    };
}
}, zodForm$(loginSchema));
 
export default component$(() => {
  const token = useContext(JwtContext);
  const nav = useNavigate();
  const [loginForm, { Form, Field }] = useForm<LoginForm,LoggedUsedResponseData>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(loginSchema),
  });

  const handleSubmit: SubmitHandler<LoginForm> = $((values, event) => {
    // Runs on client
  });

  useVisibleTask$(({ track }) => {
    track(() => loginForm.response);
    if(!loginForm.response.data) return;
    if(loginForm.response.status != "success") {
      alert("error");
      return
    } 
    token.value = loginForm.response.data.token;
    nav('/profile');
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
