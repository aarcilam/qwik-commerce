import { component$ } from "@builder.io/qwik";
import { routeLoader$, z, type DocumentHead } from "@builder.io/qwik-city";
import { InitialValues, formAction$, zodForm$, useForm } from "@modular-forms/qwik";
import { User } from "@prisma/client";
import { ButtonInput } from "~/components/shared/forms/button-input/button-input";
import { TextInput } from "~/components/shared/forms/text-input/text-input";
import { LoggedUsedResponseData } from "~/routes/auth/register";
import { UserService } from "~/services/UserService";

const shippingsSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .min(1, "Please enter your email.")
    .email("The email address is badly formatted."),
  country: z
    .string()
    .min(1, "Please enter your country."),
  name: z
    .string()
    .min(1, "Please enter your name."),
  surname: z
    .string()
    .min(1, "Please enter your surname."),
  address: z
    .string()
    .min(1, "Please enter your address."),
  addressComplement: z
    .string()
    .min(1, "Please enter your addressComplement."),
  city: z
    .string()
    .min(1, "Please enter your city."),
  department: z
    .string()
    .min(1, "Please enter your department."),
  postalCode: z
    .string()
    .min(1, "Please enter your postalCode."),
  phone: z
    .string()
    .min(1, "Please enter your phone."),
});

type ShippingsForm = z.infer<typeof shippingsSchema>;

export const useFormLoader = routeLoader$<InitialValues<ShippingsForm>>(() => ({
  email: "",
  country: "",
  name: "",
  surname: "",
  address: "",
  addressComplement: "",
  city: "",
  department: "",
  postalCode: "",
  phone: ""
}));

export const useFormAction = formAction$<ShippingsForm>(
  async (values) => {
    // Runs on server

  },
  zodForm$(shippingsSchema)
);

export default component$(() => {
  const [shippingsForm, { Form, Field }] = useForm<ShippingsForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(shippingsSchema),
  });
  return (
    <>
      <h1>Checkout</h1>
      <Form>
        <Field name="email">
          {(field, props) => (
            <TextInput
              props={props}
              type="email"
              field={field}
              placeholder="Insert a email"
            />
          )}
        </Field>
        <Field name="country">
          {(field, props) => (
            <TextInput
              props={props}
              type="country"
              field={field}
              placeholder="Insert a country"
            />
          )}
        </Field>
        <Field name="name">
          {(field, props) => (
            <TextInput
              props={props}
              type="name"
              field={field}
              placeholder="Insert a name"
            />
          )}
        </Field>
        <Field name="surname">
          {(field, props) => (
            <TextInput
              props={props}
              type="surname"
              field={field}
              placeholder="Insert a surname"
            />
          )}
        </Field>
        <Field name="address">
          {(field, props) => (
            <TextInput
              props={props}
              type="address"
              field={field}
              placeholder="Insert a address"
            />
          )}
        </Field>
        <Field name="addressComplement">
          {(field, props) => (
            <TextInput
              props={props}
              type="addressComplement"
              field={field}
              placeholder="Insert a addressComplement"
            />
          )}
        </Field>
        <Field name="city">
          {(field, props) => (
            <TextInput
              props={props}
              type="city"
              field={field}
              placeholder="Insert a city"
            />
          )}
        </Field>
        <Field name="department">
          {(field, props) => (
            <TextInput
              props={props}
              type="department"
              field={field}
              placeholder="Insert a department"
            />
          )}
        </Field>
        <Field name="postalCode">
          {(field, props) => (
            <TextInput
              props={props}
              type="postalCode"
              field={field}
              placeholder="Insert a postalCode"
            />
          )}
        </Field>
        <Field name="phone">
          {(field, props) => (
            <TextInput
              props={props}
              type="phone"
              field={field}
              placeholder="Insert a phone"
            />
          )}
        </Field>
        <ButtonInput value="Go to shipping" />
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
