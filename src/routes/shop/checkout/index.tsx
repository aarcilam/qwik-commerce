import { component$ } from "@builder.io/qwik";
import { routeLoader$, z, type DocumentHead } from "@builder.io/qwik-city";
import { InitialValues, formAction$, zodForm$ } from "@modular-forms/qwik";
import { User } from "@prisma/client";
import { LoggedUsedResponseData } from "~/routes/auth/register";
import { UserService } from "~/services/UserService";

const shippingSchema = z.object({
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

type ShippingForm = z.infer<typeof shippingSchema>;

export const useFormLoader = routeLoader$<InitialValues<ShippingForm>>(() => ({
  email: "",
  country: "",
  name: "",
  surname: "",
  address: "",
  addressComplement: "",
  city: "",
  department: "",
  postalCode: "",
  phone:""
}));

export const useFormAction = formAction$<ShippingForm, LoggedUsedResponseData>(
  async (values) => {
    // Runs on server

  },
  zodForm$(shippingSchema)
);

export default component$(() => {
  return (
    <>
      <h1>Checkout</h1>
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
