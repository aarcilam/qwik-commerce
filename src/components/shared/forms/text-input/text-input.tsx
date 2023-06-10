import { component$ } from "@builder.io/qwik";
import type { FieldStore } from "@modular-forms/qwik";

export interface TextInputProps {
  props: {};
  field: FieldStore<any, any>;
  type: string;
  placeholder: string;
}

export const TextInput = component$<TextInputProps>((props) => {
  return (
    <div>
      <input
        {...props.props}
        type={props.type}
        value={props.field.value}
        placeholder={props.placeholder}
        class="input input-bordered input-primary w-full max-w-xs"
      />
      {props.field.error && <div>{props.field.error}</div>}
    </div>
  );
});
