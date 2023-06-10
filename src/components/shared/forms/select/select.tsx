import { QRL, component$ } from "@builder.io/qwik";

export interface SelectProps {
  type: string;
  options: string[];
  onChange$?: QRL;
}

export const Select = component$<SelectProps>((props) => {
  return (
    <select name="" id="" onChange$={props.onChange$}>
      <option disabled selected>
        Select a value
      </option>
      {props.options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
});
