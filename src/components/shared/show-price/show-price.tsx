import { component$ } from "@builder.io/qwik";

export interface ShowPriceProps {
  price: number
}

export const ShowPrice = component$<ShowPriceProps>((props) => {
  const formatCurrency = (number:number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(number);
  };
  return (
    <div>
      {formatCurrency(props.price)}
    </div>
  );
});