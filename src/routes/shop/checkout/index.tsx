import { component$, $ } from "@builder.io/qwik";
import { routeLoader$, z, type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { InitialValues, formAction$, zodForm$, useForm } from "@modular-forms/qwik";
import { Order, OrderItem } from "@prisma/client";
import { CartResume } from "~/components/cart-resume/cart-resume";
import { ButtonInput } from "~/components/shared/forms/button-input/button-input";
import { TextInput } from "~/components/shared/forms/text-input/text-input";
import { OrderService } from "~/services/OrderService";


const checkoutSchema = z.object({
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

type CheckoutForm = z.infer<typeof checkoutSchema>;

export const useFormLoader = routeLoader$<InitialValues<CheckoutForm>>(() => ({
  email: "",
  country: "",
  name: "",
  address: "",
  addressComplement: "",
  city: "",
  department: "",
  postalCode: "",
  phone: ""
}));

export const useFormAction = formAction$<CheckoutForm>(
  async (values) => {
    // Runs on server
    const orderService = new OrderService();
    const orderData:Omit<Order,"id" | "createdAt" | "updatedAt" | "userId"> = {
      email: values.email,
      country: values.country,
      name: values.name,
      address: values.address,
      addressComplement: values.addressComplement,
      city: values.city,
      department: values.department,
      postalCode: values.postalCode,
      phone: values.phone,
      total: 0
    };
    const orderItems: Omit<OrderItem,"id"|"variationId"|"orderId">[] = [{
      quantity: 0,
      productId: 1
    }]
    const createdOrder = orderService.createOrder(orderData,orderItems)
  },
  zodForm$(checkoutSchema)
);

export default component$(() => {
  const nav = useNavigate();
  const [checkoutForm, { Form, Field }] = useForm<CheckoutForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(checkoutSchema),
  });

  const goToShipping = $(()=>{
    if(!checkoutForm.invalid) nav('/shop/checkout/shippings')
  })
  return (
    <>
      <h1>Checkout</h1>
      <div class="grid-cols-2 grid gap-4">
        <Form onSubmit$={()=> goToShipping()}>
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
        <div>
        <CartResume />
      </div>
      </div>
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
