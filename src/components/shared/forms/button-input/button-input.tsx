import { component$ } from "@builder.io/qwik";

export interface ButtonProps {
  value: string
}

export const ButtonInput = component$<ButtonProps>((props) => {
  return (
    <input class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" value={props.value} />
  );
});