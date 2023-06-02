import { QRL, component$ } from "@builder.io/qwik";

export interface ButtonProps {
  text: string,
  onClick$?: QRL
}

export const Button = component$<ButtonProps>((props) => {
  return (
    <button type="submit" onClick$={props.onClick$}> {props.text} </button>
  );
});