import { component$ } from "@builder.io/qwik";

export interface ShowPriceProps {
  price: number
}

export const ShowPrice = component$<ShowPriceProps>((props) => {
  return (
    <div>
      {props.price}
    </div>
  );
});