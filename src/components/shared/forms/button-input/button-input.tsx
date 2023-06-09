import { component$ } from "@builder.io/qwik";

export interface ButtonProps {
  value: string
}

export const ButtonInput = component$<ButtonProps>((props) => {
  return (
    <input class="btn btn-primary" type="submit" value={props.value} />
  );
});