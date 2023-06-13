import { QRL, component$ } from "@builder.io/qwik";
import { FieldStore } from "@modular-forms/qwik";

export interface SelectProps {
  type?: string;
  options: string[];
  onChange$?: QRL;
  props?: {};
  field?: FieldStore<any, any>;
}

export const Select = component$<SelectProps>((props) => {
  return (
    <>
      <select {...props.props} onChange$={props.onChange$}>
        <option disabled selected>
          Select a value
        </option>
        {props.options.map((option) => (
          <option value={option} selected={props.field?.value === option}>
            {option}
          </option>
        ))}
      </select>
      {props.field?.error && <div>{props.field.error}</div>}
    </>
  );
});
