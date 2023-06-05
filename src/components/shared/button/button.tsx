import { QRL, component$ } from "@builder.io/qwik";

export interface ButtonProps {
  text: string,
  onClick$?: QRL
}

export const Button = component$<ButtonProps>((props) => {
  return (
    <button class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" onClick$={props.onClick$}> {props.text} </button>
  );
});