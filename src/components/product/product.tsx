import { component$, $ } from "@builder.io/qwik";
import { Button } from "../shared/button/button";
import { ShowPrice } from "../shared/show-price/show-price";
import { ImageWithBackHover } from "../shared/image-with-back-hover/image-with-back-hover";

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
    <>
      <ImageWithBackHover frontImage={props.image} backImage={props.image}/>
      <h2>{props.name}</h2>
      <ShowPrice price={props.price} />
      <Button text="Add To Cart" onClick$={() => addToCart()}></Button>
    </>
  );
});