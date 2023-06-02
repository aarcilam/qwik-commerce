import { component$, $ } from "@builder.io/qwik";
import { Button } from "../shared/button/button";

export interface ProductProps {
  id: number
  name: string
  description: string
  image: string | null
  price: number
}

export const Product = component$<ProductProps>((props) => {
  const addToCart = $(()=>{
    console.log("addToCart ",props.id);
  })
  return (
    <div>
      <img src={props.image} alt="" />
      <h2 >{props.name}</h2>
      <span> {props.price} </span>
      <Button text="Add To Cart" onClick$={() => addToCart()}></Button>
    </div>
  );
});