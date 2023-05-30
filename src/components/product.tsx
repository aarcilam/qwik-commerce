import { component$ } from "@builder.io/qwik";

export interface ProductProps {
  title: string,
  price: number,
  image: string
}

export const Product = component$<ProductProps>((props) => {
  return (
    <div>
      
    </div>
  );
});