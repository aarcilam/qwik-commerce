import { QRL, component$ } from "@builder.io/qwik";

export interface ButtonProps {
  text: string;
  onClick$?: QRL;
}

export const Button = component$<ButtonProps>((props) => {
  // TODO make 3 types of buttons , simple , primary , secondary
  return (
    <button class="btn btn-primary" type="submit" onClick$={props.onClick$}>
      {" "}
      {props.text}{" "}
    </button>
  );
});
