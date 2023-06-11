import { component$ } from "@builder.io/qwik";
import { routeLoader$, z, type DocumentHead } from "@builder.io/qwik-city";
import { InitialValues, formAction$, zodForm$, useForm } from "@modular-forms/qwik";
import { User } from "@prisma/client";
import { ButtonInput } from "~/components/shared/forms/button-input/button-input";
import { TextInput } from "~/components/shared/forms/text-input/text-input";
import { LoggedUsedResponseData } from "~/routes/auth/register";
import { UserService } from "~/services/UserService";

const shippingsSchema = z.object({
  shippingMethod: z
    .string()
    .min(1, "Please enter your shipping method.")
    .email("The email address is badly formatted."),
});

type ShippingsForm = z.infer<typeof shippingsSchema>;

export const useFormLoader = routeLoader$<InitialValues<ShippingsForm>>(() => ({
  shippingMethod: "",
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
        <Field name="shippingMethod">
          {(field, props) => (
            <TextInput
              props={props}
              type="shippingMethod"
              field={field}
              placeholder="Insert a shippingMethod"
            />
          )}
        </Field>
        <ButtonInput value="Go to payment" />
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
